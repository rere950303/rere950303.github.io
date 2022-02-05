---
title: "[Spring][Security] 스프링 시큐리티 테스트"
last\_modified\_at: 2022-02-05T 7:11 +09:00
header:
  overlay\_color: "#333"
categories:
  - Spring/Security
tags:
  - Spring
  - Security
---
## 들어가며
MockUser를 이용하여 메소드 보안 단위 테스트 하는 방법과 과정을 기록하기 위한 포스팅

## @WithSecurityContext
```java
@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory.class)
public @interface WithMockCustomUser {

    String username() default "yhw";

    String studentId() default "~";

    String password() default "~";

    String passwordConfirm() default "~";

    String role() default "ROLE_USER";
}
```

## WithMockCustomUserSecurityContextFactory
- `WithMockCustomUser`를 매개변수로 받아서 애노테이션의 값을 이용해 `SecurityContext`를 반환하다. `SecurityContext`에는 `Authentication`이 담겨 있다. 스프링이 기본으로 제공하는 `@WithMockUser`, `@WithAnonyMous` 등도 이와 같은 방법으로 구성되어 있다.

```java
public class WithMockCustomUserSecurityContextFactory implements WithSecurityContextFactory<WithMockCustomUser> {
    @Override
    public SecurityContext createSecurityContext(WithMockCustomUser annotation) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        User user = new User(new SignUpDTO(annotation.username(), annotation.studentId(), annotation.password(),
                annotation.passwordConfirm()), new BCryptPasswordEncoder());

        UserContext userContext = new UserContext(user);
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(userContext, null, List.of(new SimpleGrantedAuthority(annotation.role())));

        context.setAuthentication(usernamePasswordAuthenticationToken);

        return context;
    }
}
```

## 사용법
```java
@WebMvcTest(AuthController.class)
@Import({ObjectMapper.class, JwtAuthenticationEntryPoint.class, HttpEncodingAutoConfiguration.class})
class AuthControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    AuthService authService;

    @MockBean
    TokenProvider tokenProvider;

    @MockBean
    private JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Test
    @DisplayName("withdrawalFailTest")
    @WithMockCustomUser(studentId = "1234")
    public void withdrawalFailTest() throws Exception {
        mockMvc.perform(post("/api/authentication/withdrawal/{studentId}", "123"))
                .andExpect(status().isForbidden())
                .andExpect(result -> assertThat(result.getResolvedException()).isInstanceOf(AccessDeniedException.class))
                .andDo(print());
    }

    @DisplayName("withdrawalSuccessTest")
    @WithMockCustomUser(studentId = "1234")
    public void withdrawalSuccessTest() throws Exception {
        mockMvc.perform(post("/api/authentication/withdrawal/{studentId}", "1234"))
                .andExpect(status().isOk())
                .andDo(print());
    }
}
```