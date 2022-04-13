---
title: "[Spring][Security] 인터셉터, Oauth2, JWT를 통한 인증 구현"
last\_modified\_at: 2022-04-13T 12:33 +09:00
header:
  overlay\_color: "#333"
categories:
  - Spring/Security
tags:
  - Spring
  - Security
  - Oauth2
  - JWT
  - Interceptor
---
## 들어가며
이번 동아리 프로젝트에서 Security 모듈을 담당하게 되어서 코딩 과정을 기록하기 위한 포스팅

## Workflow
- 다른 팀원분이 구현해 주신 Oatuh2를 통해서 유저 카카오톡의 id, email 등을 이용하여 JWT를 발급해 준다.
- 인터셉터를 통해서 헤더값의 JWT를 검증하고 유효하지 않은 경우 `AuthenticationException`을 발생시킨다.
- 클라이언트에서 refreshToken을 통해 `/refresh` 요청이 들어오면 refreshToken의 유효성 검증을 하고 유효한 경우 새로운 JWT을 발급해 주고 refreshToken 마저 유효하지 않은 경우 `AuthenticationException`을 발생시킨다.
- 예외는 `RestControllerAdvice`를 통해 처리한다. 핸들러나 인터셉터에서 예외 터져서 `dispatcherservlet`으로 예외가 넘겨지면 `ExceptionHandlerExceptionResolver`(1순위) 에서 `@ExceptionHandler`릍 통해 예외 처리를 하게 된다. 
- 처음에 인터셉터에서 터진 예외는 따로 `response` 객체를 통해 처리해야 된다고 생각했는데 이분 탐색 방식으로 디버깅을 찍어보니 결국 `dispatcherservlet`에서 `ExceptionHandlerExceptionResolver`를 이용해 예외 처리하는 것을 볼 수 있었다.

## 사용 코드
- `SecurityInterceptor`

```java
public class SecurityInterceptor implements HandlerInterceptor {

    private static final String AUTH_TOKEN = "AUTH_TOKEN";
    private final JwtService jwtService;

    public SecurityInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader(AUTH_TOKEN);

        if (StringUtils.hasText(token) && jwtService.verifyToken(token)) {
            return true;
        } else {
            throw new UnAuthenticationException("AUTH_TOKEN 만료되었습니다.");
        }
    }
}
```
- `ControllerAdvice`

```java
@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public CommonResult authenticationExHandle(UnAuthenticationException ex) {
        return new CommonResult(ex.getMessage(), "401");
    }
}
```

## 테스트 코드
- `TokenRefreshControllerTest`

```java
@WebMvcTest(TokenRefreshController.class)
@Import(WebConfig.class)
class TokenRefreshControllerTest {

    @SpyBean
    JwtServiceImpl jwtService;

    @MockBean
    TokenRefreshService tokenRefreshService;

    @Autowired
    MockMvc mockMvc;

    @Test
    @DisplayName("validToken")
    public void validToken() throws Exception {
        AuthToken authToken = new AuthToken(
                jwtService.issuedToken("auth", "USER", 100000),
                jwtService.issuedToken("refresh", "USER", 100000)
        );

        mockMvc.perform(get("/validtoken").header("AUTH_TOKEN", authToken.getAuth()))
                .andExpect(status().isOk())
                .andExpect(content().string("valid token"))
                .andDo(print());
    }

    @Test
    @DisplayName("expiredAuthToken")
    public void expiredAuthToken() throws Exception {
        AuthToken authToken = new AuthToken(
                jwtService.issuedToken("auth", "USER", 0),
                jwtService.issuedToken("refresh", "USER", 0)
        );

        mockMvc.perform(get("/validtoken").header("AUTH_TOKEN", authToken.getAuth()))
                .andExpect(jsonPath("$.msg").value("AUTH_TOKEN 만료되었습니다."))
                .andExpect(jsonPath("$.code").value("401"))
                .andExpect(status().isUnauthorized())
                .andDo(print());
    }

    @Test
    @DisplayName("refresh_성공")
    public void refresh_성공() throws Exception {
        AuthToken authToken = new AuthToken("auth", "refresh");
        when(tokenRefreshService.createNewAuthToken(any())).thenReturn(authToken);

        mockMvc.perform(get("/refresh"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.auth").value("auth"))
                .andExpect(jsonPath("$.refresh").value("refresh"))
                .andDo(print());
    }

    @Test
    @DisplayName("refresh_실패")
    public void refresh_실패() throws Exception {
        when(tokenRefreshService.createNewAuthToken(any())).thenThrow(new UnAuthenticationException("토큰이 만료되었습니다."));

        mockMvc.perform(get("/refresh"))
                .andExpect(jsonPath("$.msg").value("토큰이 만료되었습니다."))
                .andExpect(jsonPath("$.code").value("401"))
                .andExpect(status().isUnauthorized())
                .andDo(print());
    }

}
```
- `TokenRefreshServiceImplTest`

```java
class TokenRefreshServiceImplTest {

    JwtService jwtService = new JwtServiceImpl();
    TokenRefreshServiceImpl tokenRefreshService = new TokenRefreshServiceImpl(jwtService);

    @Test
    @DisplayName("validRefreshToken")
    public void validRefreshToken() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        AuthToken authToken = new AuthToken(
                jwtService.issuedToken("email", "USER", 0),
                jwtService.issuedToken("email", "USER", 1000000)
        );
        request.addHeader("REFRESH_TOKEN", authToken.getRefresh());
        AuthToken newAuthToken = tokenRefreshService.createNewAuthToken(request);

        assertThat(jwtService.getSubject(newAuthToken.getAuth())).isEqualTo("email");
        assertThat(jwtService.getSubject(newAuthToken.getRefresh())).isEqualTo("email");
    }

    @Test
    @DisplayName("expiredRefreshToken")
    public void expiredRefreshToken() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        AuthToken authToken = new AuthToken(
                jwtService.issuedToken("email", "USER", 0),
                jwtService.issuedToken("email", "USER", 0)
        );
        request.addHeader("REFRESH_TOKEN", authToken.getRefresh());

        assertThatThrownBy(() -> tokenRefreshService.createNewAuthToken(request))
                .isInstanceOf(UnAuthenticationException.class);
    }

    @Test
    @DisplayName("noRefreshToken")
    public void noRefreshToken() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();

        assertThatThrownBy(() -> tokenRefreshService.createNewAuthToken(request))
                .isInstanceOf(UnAuthenticationException.class);
    }
}
```

## 고찰
- 처음엔 Spring Secuirty 프레임워크를 사용하고 `JWTfliter`와 `AuthenticationEntrypoint`를 커스텀 해서 구현해 볼까 하다가 인터셉터를 통해 직접 구현해 보고 싶어서 이렇게 했다. 프레임워크보다는 훨씬 가볍다고 느껴졌고 차후에 세션, 메소드 시큐리티, CORS, CSRF 등등 보안과 관련된 이슈가 터졌을 때 프레임워크의 도입을 고민해 봐야겠다.
- 테스트 코드와 관련해서 팀원분의 피드백을 받을 수 있어서 좋았다. 나는 멀티 모듈 환경에서 컨텍스트를 활용한 단위 테스트를 위해 `@SpringBootApplication`을 이용했다. 다음 모듈 작업 시에는 피드백대로 컨텍스트를 활용하지 않고 Mock 객체를 통한 stubbing을 하고 완벽한 tdd를 해봐야겠다.