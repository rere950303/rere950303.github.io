---
title: "[Spring][Security] 스프링 시큐리티"
last\_modified\_at: 2021-10-31T 1:53 +09:00
header:
  overlay\_color: "#333"
Security_1:
    - url: /assets/images/post/Spring/Security/1.png
      image_path: /assets/images/post/Spring/Security/1.png
Security_2:
    - url: /assets/images/post/Spring/Security/2.png
      image_path: /assets/images/post/Spring/Security/2.png
Security_3:
    - url: /assets/images/post/Spring/Security/3.png
      image_path: /assets/images/post/Spring/Security/3.png
Security_4:
    - url: /assets/images/post/Spring/Security/4.png
      image_path: /assets/images/post/Spring/Security/4.png
Security_5:
    - url: /assets/images/post/Spring/Security/5.png
      image_path: /assets/images/post/Spring/Security/5.png
Security_6:
    - url: /assets/images/post/Spring/Security/6.png
      image_path: /assets/images/post/Spring/Security/6.png
categories:
  - Spring/Security
tags:
  - Security
  - Spring
---
## 들어가며
해당 게시글은 인프런 백기선 강사님의 [스프링 시큐리티][1] 강의를 바탕으로 쓰였음을 미리 밝힙니다.

## 스프링 시큐리티: 폼 인증
### 스프링 시큐리티 연동
- gradle 설정

```yaml
implementation 'org.springframework.boot:spring-boot-starter-security'
```
- 기본 유저가 생성됨(ID: user)
  
```yaml
Using generated security password: 114284e0-656a-4fdf-b623-9b552a85b6c8
```
- 모든 요청은 인증을 필요로함

### 스프링 시큐리티 설정하기
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/", "/info").permitAll()
                .mvcMatchers("/admin").hasRole("ADMIN")
                .anyRequest().authenticated();

        http.formLogin();
        http.httpBasic();
    }
}
```
- 요청 URL별 인증 설정

### 스프링 시큐리티 커스터마이징: 인메모리 유저 추가
- UserDetailsServiceAutoConfiguration(클래스)에서 기본 유저를 추가
- SecurityProperties(클래스)에서 기본 유저의 정보 변경 가능

```java
@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
            .withUser("keesun").password("{noop}123").roles("USER").and() // 패스워드의 데이터베이스 저장용 인코딩 방식을 말한다.
            .withUser("admin").password("{noop}!@#").roles("ADMIN");
}

@Bean
@Override
public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
}
```
- 인메모리 사용자 추가
- 로컬 AuthenticationManager를 빈으로 노출

### 스프링 시큐리티 커스터마이징: JPA 연동
```java
@Entity
public class Account {
    @Id
    @GeneratedValue
    private Integer id;
    
    @Column(unique = true)
    private String username;
    
    private String password;
    private String role;
}
```
```java
@Service
public class AccountService implements UserDetailsService {
    @Autowired
    AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username);

        if (account == null) {
            throw new UsernameNotFoundException(username);
        }
        return User.builder()
                .username(account.getUsername())
                .password(account.getPassword())
                .roles(account.getRole())
                .build();
    }
}
```
- `User`클래스를 통해 `UserDetails`인퍼테이스의 구현체를 간단히 생성 가능

### 스프링 시큐리티 커스터마이징: PasswordEncoder
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
}
```
```java
@AllArgsConstructor
@Entity
@Data
@NoArgsConstructor
public class Account {
    ...

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }
    
    ...
}
```
- 스프링 시큐리티가 제공하는 `PasswordEndoer`는 특정한 포맷으로 동작함.
- `{id}encodedPassword`: 각 패스워드에 맞는 인코더를 활용해 회원의 패스워드를 암호화
- 다양한 해싱 전략의 패스워드를 지원할 수 있다는 장점이 있습니다.
- 기본 전략인 `bcrypt`로 암호화 해서 저장하며 비교할 때는 {id}를 확인해서 다양한 인코딩을 지원합니다.

### 스프링 시큐리티 테스트
```java
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@Rollback
class AccountControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    AccountService accountService;

    @Test
    @WithAnonymousUser
    public void index_anonymous() throws Exception {
        mockMvc.perform(get("/"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @WithUser
    public void index_user() throws Exception {
        mockMvc.perform(get("/"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @WithUser
    public void admin_user() throws Exception {
        mockMvc.perform(get("/admin"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "yhw", roles = "ADMIN")
    public void admin_admin() throws Exception {
        mockMvc.perform(get("/admin"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void login_success1() throws Exception {
        Account account = new Account();
        account.setUsername("yhw");
        account.setPassword("123");
        account.setRole("USER");
        accountService.createNew(account);
        mockMvc.perform(formLogin().user("yhw").password("123"))
                .andExpect(authenticated());
    }

    @Test
    public void login_fail() throws Exception {
        Account account = new Account();
        account.setUsername("yhw");
        account.setPassword("123");
        account.setRole("USER");
        accountService.createNew(account);
        mockMvc.perform(formLogin().user("yhw").password("12345"))
                .andExpect(unauthenticated());
    }

    @Test
    public void login_success2() throws Exception {
        Account account = new Account();
        account.setUsername("yhw");
        account.setPassword("123");
        account.setRole("USER");
        accountService.createNew(account);
        mockMvc.perform(formLogin().user("yhw").password("123"))
                .andExpect(authenticated());
    }
```
```java
@Retention(RetentionPolicy.RUNTIME)
@WithMockUser(username = "yhw", roles = "USER")
public @interface WithUser {
}
```
- `@WithUser`라는 애노테이션 직접 생성
- `@With~` 애노테이션은 이미 그러한 사용자로 로그인한 상황을 가정함
- 응답 유형 확인
  - `authenticated()`
  - `unauthenticated()`

## 스프링 시큐리티: 아키텍처
### SecurityContextHolder와 Authentication
{% include gallery id="Security_1" %}

- `SecurityContextHolder`: `SecurityContext` 제공, 기본적으로 ThreadLocal을 사용한다.
- `SecuuryContext`: `Authentication` 제공.
- `Authentication`: Principal과 GrantAuthority 제공.(`UsernamePasswordAuthenticationToken`)
- `Principal`: “누구"에 해당하는 정보. `UserDetailsService`에서 리턴한 그 객체.(`User`클래스), 객체는 `UserDetails`(인퍼테이스) 타입.
- `UserDetails`: 애플리케이션이 가지고 있는 유저 정보와 스프링 시큐리티가 사용하는 `Authentication`객체 사이의 어댑터. 
- `UserDetailsService`: 유저 정보를 `UserDetails` 타입으로 가져오는 DAO (Data Access Object) 인터페이스.
- `SecurityContextHolder`

```java
private static void initialize() {
		if (!StringUtils.hasText(strategyName)) {
			// Set default
			strategyName = MODE_THREADLOCAL;
		}
		if (strategyName.equals(MODE_THREADLOCAL)) {
			strategy = new ThreadLocalSecurityContextHolderStrategy();
		}
		else if (strategyName.equals(MODE_INHERITABLETHREADLOCAL)) {
			strategy = new InheritableThreadLocalSecurityContextHolderStrategy();
		}
		else if (strategyName.equals(MODE_GLOBAL)) {
			strategy = new GlobalSecurityContextHolderStrategy();
		}
		else {
			// Try to load a custom strategy
			try {
				Class<?> clazz = Class.forName(strategyName);
				Constructor<?> customStrategy = clazz.getConstructor();
				strategy = (SecurityContextHolderStrategy) customStrategy.newInstance();
			}
			catch (Exception ex) {
				ReflectionUtils.handleReflectionException(ex);
			}
		}
		initializeCount++;
}
```
- `ThreadLocalSecurityContextHolderStrategy`

```java
final class ThreadLocalSecurityContextHolderStrategy implements SecurityContextHolderStrategy {

	private static final ThreadLocal<SecurityContext> contextHolder = new ThreadLocal<>();

	@Override
	public void clearContext() {
		contextHolder.remove();
	}

	@Override
	public SecurityContext getContext() {
		SecurityContext ctx = contextHolder.get();
		if (ctx == null) {
			ctx = createEmptyContext();
			contextHolder.set(ctx);
		}
		return ctx;
	}

	@Override
	public void setContext(SecurityContext context) {
		Assert.notNull(context, "Only non-null SecurityContext instances are permitted");
		contextHolder.set(context);
	}

	@Override
	public SecurityContext createEmptyContext() {
		return new SecurityContextImpl();
	}
}
```
- http 요청이 들어오면 `setContext` 메소드에서 인증된 `SecuiryContext` 객체를 매개변수로 받아 TLS 변수로 저장한다. 이후 같은 쓰레드에서 `SecuiryContext` 에 접근하면 항상 같은 `SecuiryContext` 객체를 얻을수 있게 된다.

### AuthenticationManager와 Authentication
- 스프링 시큐리티에서 인증(Authentication)은 `AuthenticationManager`(인터페이스)가 한다.(구현체는 `ProviderManager`)

```java
Authentication authenticate(Authentication authentication) throws AuthenticationException
```
- 인자로 받은 `Authentication`이 유효한 인증인지 확인하고 `UserDetailService`에서 반환한 `UserDetails`를 담은 `Authetication` 객체를 리턴한다.
- 인자로 받은 Authentication
  - 사용자가 입력한 인증에 필요한 정보(username, password)로 만든 객체. (폼 인증인 경우)
- Authentication
  - Principal: “yhw”
  - Credentials: “123”
- 유효한 인증인지 확인
  - 사용자가 입력한 password가 `UserDetailsService`를 통해 읽어온 `UserDetails` 객체에 들어있는 password와 일치하는지 확인
- `Authentication` 객체를 리턴
  - `Principal`: UserDetailsService에서 리턴한 그 객체 (`User`)
  - Credentials:
  - `GrantedAuthorities`

### ThreadLocal
- `Java.lang` 패키지에서 제공하는 쓰레드 범위 변수. static 변수와 비슷한 개념으로써 메소드 상관없이 쓰레드 단위로 접근, 변경 가능하다.
  - 같은 쓰레드 내에서만 공유.
  - 따라서 같은 쓰레드라면 해당 데이터를 메소드 매개변수로 넘겨줄 필요 없음.
  - `SecurityContextHolder`의 기본 전략.

### Authencation과 SecurityContextHodler
- `UsernamePasswordAuthenticationFilter`
  - 폼 인증을 처리하는 시큐리티 필터
  - `ProviderManager`에서 인증, 반환된 `Authentication` 객체(`UserDetails`를 담음)를 `SecurityContext`에 넣어주는 필터
  - `SecurityContextHolder.getContext().setAuthentication(authentication)`(추상 부모 클래스에서)
- `SecurityContextPersistenceFilter`
  - `SecurityContext`를 HTTP session에 캐시(기본 전략)하여 여러 요청에서 `Authentication`을 공유할수 있는 필터.
  - 매 요청마다 세션에 저장된 `SecurityContext`가 있는지 확인하고 요청이 끝나고 나갈때 해당 쓰레드의 `SecurityContext`를 비우고 세션에 `SecurityContext`를 저장한다. 따라서 같은 HTTP session의 경우 같은 `SecurityContext`를 공유하게 된다.
  - `SecurityContextRepository`를 교체하여 세션을 HTTP session이 아닌 다른 곳에 저장하는 것도 가능하다.

```java
private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
    ...
    
    HttpRequestResponseHolder holder = new HttpRequestResponseHolder(request, response);
    SecurityContext contextBeforeChainExecution = this.repo.loadContext(holder);
    try {
        SecurityContextHolder.setContext(contextBeforeChainExecution);
        if (contextBeforeChainExecution.getAuthentication() == null) {
            logger.debug("Set SecurityContextHolder to empty SecurityContext");
        }
        else {
            if (this.logger.isDebugEnabled()) {
                this.logger
                        .debug(LogMessage.format("Set SecurityContextHolder to %s", contextBeforeChainExecution));
            }
        }
        chain.doFilter(holder.getRequest(), holder.getResponse());
    }
    finally {
        SecurityContext contextAfterChainExecution = SecurityContextHolder.getContext();
        // Crucial removal of SecurityContextHolder contents before anything else.
        SecurityContextHolder.clearContext();
        this.repo.saveContext(contextAfterChainExecution, holder.getRequest(), holder.getResponse());
        request.removeAttribute(FILTER_APPLIED);
        this.logger.debug("Cleared SecurityContextHolder to complete request");
    }
}
```

### 스프링 시큐리티 Filter와 FilterChainProxy
{% include gallery id="Security_2" %}

1. WebAsyncManagerIntergrationFilter
2. **SecurityContextPersistenceFilter**
3. HeaderWriterFilter
4. CsrfFilter
5. LogoutFilter
6. **UsernamePasswordAuthenticationFilter**
7. DefaultLoginPageGeneratingFilter
8. DefaultLogoutPageGeneratingFilter
9. BasicAuthenticationFilter
10. RequestCacheAwareFtiler
11. SecurityContextHolderAwareReqeustFilter 
12. AnonymouseAuthenticationFilter
13. SessionManagementFilter 
14. ExeptionTranslationFilter 
15. FilterSecurityInterceptor

- 이 모든 필터는 `FilterChainProxy`가 호출한다.

```java
private List<Filter> getFilters(HttpServletRequest request) {
    int count = 0;
    for (SecurityFilterChain chain : this.filterChains) {
        if (logger.isTraceEnabled()) {
            logger.trace(LogMessage.format("Trying to match request against %s (%d/%d)", chain, ++count,
                    this.filterChains.size()));
        }
        if (chain.matches(request)) {
            return chain.getFilters();
        }
    }
    return null;
}
```
- 여러개의 필터체인에서 `antMatcher`에 상응하는 체인을 가져오고 이를 토대로 여러개의 필터를 순서대로 거친다.

### DelegatingFilterProxy와 FilterChainProxy
{% include gallery id="Security_3" %}

- `DelegatingFilterProxy`
  - 일반적인 서블릿 필터.
  - 서블릿 필터 처리를 스프링에 들어있는 빈으로 위임하고 싶을 때 사용하는 서블릿 필터.
  - 타겟 빈 이름을 설정한다.
  - 스프링 부트를 사용할 때는 자동으로 등록 된다. (`SecurityFilterAutoConfiguration`)
- `FilterChainProxy`
  - “springSecurityFilterChain” 이라는 이름의 빈으로 등록된다.

### AccessDecisionManager 1부
- 인증이 아닌 인가

```java
@Override
@SuppressWarnings({"rawtypes", "unchecked"})
public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes) throws AccessDeniedException {
    int deny = 0;
    
    for (AccessDecisionVoter voter : getDecisionVoters()) {
        int result = voter.vote(authentication, object, configAttributes);
        switch (result) {
            case AccessDecisionVoter.ACCESS_GRANTED:
                return;
            case AccessDecisionVoter.ACCESS_DENIED:
                deny++;
                break;
            default:
                break;
        }
    }
    if (deny > 0) {
        throw new AccessDeniedException(
                this.messages.getMessage("AbstractAccessDecisionManager.accessDenied", "Access is denied"));
    }
    // To get this far, every AccessDecisionVoter abstained
    checkAllowIfAllAbstainDecisions();
}
```
- Access Control 결정을 내리는 인터페이스로, 구현체 3가지를 기본으로 제공한다.
  - AffirmativeBased: 여러 Voter중에 한명이라도 허용하면 허용. 기본 전략.
  - ConsensusBased: 다수결
  - UnanimousBased: 만장일치
- `AccessDecisionVoter`(인터페이스)
  - 해당 Authentication이 특정한 Object에 접근할 때 필요한 ConfigAttributes를 만족하는지 확인한다.
  - WebExpressionVoter: 웹 시큐리티에서 사용하는 기본 구현체, ROLE_Xxxx가 매치하는지 확인.
  - RoleHierarchyVoter: 계층형 ROLE 지원. ADMIN > MANAGER > USER

### AccessDecisionManager 2부
- `AccessDecisionManager` 또는 Voter를 커스터마이징 하는 방법

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    public SecurityExpressionHandler expressionHandler() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        roleHierarchy.setHierarchy("ROLE_ADMIN > ROLE_USER");
        DefaultWebSecurityExpressionHandler handler = new DefaultWebSecurityExpressionHandler();
        handler.setRoleHierarchy(roleHierarchy);
        return handler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/", "/info", "/account/**").permitAll()
                .mvcMatchers("/admin").hasRole("ADMIN")
                .mvcMatchers("/user").hasRole("USER")
                .anyRequest().authenticated()
                .expressionHandler(expressionHandler());
        http.formLogin();
        http.httpBasic();
    }
}
```
- `WebExpressionVoter`

```java
private SecurityExpressionHandler<FilterInvocation> expressionHandler = new DefaultWebSecurityExpressionHandler();

...

public void setExpressionHandler(SecurityExpressionHandler<FilterInvocation> expressionHandler) {
    this.expressionHandler = expressionHandler;
}
```
- 위계를 이해할 수 있는 handler를 `AffirmativeBased` 의 `WebExpressionVoter`에 주입한다.

### FilterSecurityInterceptor
- `AccessDecisionManager`를 사용하여 Access Control 또는 예외 처리 하는 필터. 대부분의 경우 `FilterChainProxy`에 제일 마지막 필터로 들어있다.

```java
private void attemptAuthorization(Object object, Collection<ConfigAttribute> attributes, Authentication authenticated) {
    try {
        this.accessDecisionManager.decide(authenticated, object, attributes);
    } catch (AccessDeniedException ex) {
        if (this.logger.isTraceEnabled()) {
            this.logger.trace(LogMessage.format("Failed to authorize %s with attributes %s using %s", object,
                    attributes, this.accessDecisionManager));
        } else if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Failed to authorize %s with attributes %s", object, attributes));
        }
        publishEvent(new AuthorizationFailureEvent(object, attributes, authenticated, ex));
        throw ex;
    }
}
```

### ExceptionTranslationFilter
- 필터 체인에서 발생하는 `AccessDeniedException`과 `AuthenticationException`을 처리하는 필터
- `AuthenticationException` 발생 시
  - `AuthenticationEntryPoint` 실행
  - `AbstractSecurityInterceptor` 하위 클래스(예, `FilterSecurityInterceptor`)에서 발생하는 예외만 처리.
- `AccessDeniedException` 발생 시
  - 익명 사용자라면 `AuthenticationEntryPoint` 실행
  - 익명 사용자가 아니면 `AccessDeniedHandler`에게 위임
- `ExceptionTranslationFilter`

```java
private void handleAuthenticationException(HttpServletRequest request, HttpServletResponse response,
                                           FilterChain chain, AuthenticationException exception) throws ServletException, IOException {
    this.logger.trace("Sending to authentication entry point since authentication failed", exception);
    sendStartAuthentication(request, response, chain, exception);
}

private void handleAccessDeniedException(HttpServletRequest request, HttpServletResponse response,
                                         FilterChain chain, AccessDeniedException exception) throws ServletException, IOException {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    boolean isAnonymous = this.authenticationTrustResolver.isAnonymous(authentication);
    if (isAnonymous || this.authenticationTrustResolver.isRememberMe(authentication)) {
        if (logger.isTraceEnabled()) {
            logger.trace(LogMessage.format("Sending %s to authentication entry point since access is denied",
                    authentication), exception);
        }
        sendStartAuthentication(request, response, chain,
                new InsufficientAuthenticationException(
                        this.messages.getMessage("ExceptionTranslationFilter.insufficientAuthentication",
                                "Full authentication is required to access this resource")));
    } else {
        if (logger.isTraceEnabled()) {
            logger.trace(
                    LogMessage.format("Sending %s to access denied handler since access is denied", authentication),
                    exception);
        }
        this.accessDeniedHandler.handle(request, response, exception);
    }
}
```

- `UsernamePasswordAuthenticationFilter`에서 발생한 인증 에러(`AbstractAuthenticationProcessingFilter`에서 처리)

```java
...

catch (AuthenticationException ex) {
// Authentication failed
unsuccessfulAuthentication(request, response, ex);
}
...

protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                          AuthenticationException failed) throws IOException, ServletException {
    SecurityContextHolder.clearContext();
    this.logger.trace("Failed to process authentication request", failed);
    this.logger.trace("Cleared SecurityContextHolder");
    this.logger.trace("Handling authentication failure");
    this.rememberMeServices.loginFail(request, response);
    this.failureHandler.onAuthenticationFailure(request, response, failed);
}
...
```
- `SimpleUrlAuthenticationFailureHandler`

```java
@Override
public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                    AuthenticationException exception) throws IOException, ServletException {
    if (this.defaultFailureUrl == null) {
        if (this.logger.isTraceEnabled()) {
            this.logger.trace("Sending 401 Unauthorized error since no failure URL is set");
        } else {
            this.logger.debug("Sending 401 Unauthorized error");
        }
        response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
        return;
    }
    saveException(request, exception);
    if (this.forwardToDestination) {
        this.logger.debug("Forwarding to " + this.defaultFailureUrl);
        request.getRequestDispatcher(this.defaultFailureUrl).forward(request, response);
    } else {
        this.redirectStrategy.sendRedirect(request, response, this.defaultFailureUrl);
    }
}
```

### 스프링 시큐리티 아키텍처 정리
{% include gallery id="Security_4" %}

- https://spring.io/guides/topicals/spring-security-architecture
- https://docs.spring.io/spring-security/site/docs/5.1.5.RELEASE/reference/htmlsingle/#overall-architecture

## 웹 애플리케이션 시큐리티
### 스프링 시큐리티 ignoring() 1부
- `WebSecurity`의 `ignoring()`을 사용해서 시큐리티 필터 적용을 제외할 요청을 설정할 수 있다.
- 스프링 부트가 제공하는 PathRequest를 사용해서 정적 자원 요청을 스프링 시큐리티 필터를 적용하지 않도록 설정.

```java
@Override
public void configure(WebSecurity web) throws Exception {
    web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
}
```
- favicon.ico 리다이렉트의 경우 필터의 목록이 0이다. 즉 시큐리티 필터를 거치지 않는다. 따라서 /login 으로 redirect 되지도 않는다.

### 스프링 시큐리티 ignoring() 2부
```java
http.authorizeRequests()
.requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
```
- 이런 설정으로도 같은 결과를 볼 수는 있지만 스프링 시큐리티 필터가 적용된다는 차이가 있다.
  - 필터가 그대로 적용되고 마지막 `FilterSecurityInterceptor`에서 `AccessDecisionManager`를 통해 요청이 허가된다.
  - 동적 리소스는 http.authorizeRequests()에서 처리하는 것을 권장
  - 정적 리소스는 WebSecurity.ignore()를 권장하며 예외적인 정적 자원 (인증이 필요한 정적자원이 있는 경우)는 http.authorizeRequests()를 사용

### Async 웹 MVC를 지원하는 필터: WebAsyncManagerIntegrationFilter
- 스프링 MVC의 Async 기능(핸들러에서 `Callable`을 리턴할 수 있는 기능)을 사용할 때에도 `SecurityContext`를 공유하도록 도와주는 필터.
  - `PreProcess`: `SecurityContext`를 설정한다.
  - `Callable`: 비록 다른 쓰레드지만 그 안에서는 동일한 `SecurityContext`를 참조할 수 있다.
  - `PostProcess`: `SecurityContext`를 정리(clean up)한다.

### 스프링 시큐리티와 @Async
- `@Async`를 사용한 서비스를 호출하는 경우 쓰레드가 다르기 때문에 `SecurityContext`를 공유받지 못한다.

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    ...

    SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);

    ...
}
```
```java
@SpringBootApplication
@EnableAsync
public class DemoSpringSecurityFormApplication {
    ...
}
```
- `SecurityContext`를 자식 쓰레드에도 공유하는 전략.
- `@Async`를 처리하는 쓰레드에서도 `SecurityContext`를 공유받을 수 있다.

### SecurityContext 영속화 필터: SecurityContextPersistenceFilter
- `SecurityContextRepository`를 사용해서 기존의 `SecurityContext`를 읽어오거나 초기화 한다.(구현제 `HttpSessionSecurityContextRepository`)
  - 첫 요청이어서 세션 저장소에 저장된 `SecurityContext`가 없는 경우 `null`값을 가지는 `Authentication`을 담은 `SecurityContext`를 반환한다.
  - 기본으로 사용하는 전략은 HTTP Session을 사용한다.
  - Spring-Session과 연동하여 세션 클러스터를 구현할 수 있다.

### CSRF 어택 방지 필터: CsrfFilter
{% include gallery id="Security_5" %}

- form 기반 웹 페이지의 경우 인증된 유저의 계정을 사용해 악의적인 변경 요청을 막아내기 위한 기법
- 서버에서 form 보낼때 csrf 토큰을 생성하여 hidden 필드로 보내고 요청이 들어올때 실제 csrf 토큰과 일치하는지 여부를 검사

### 로그아웃 처리 필터: LogoutFilter
- 여러 `LogoutHandler`를 사용하여 로그아웃시 필요한 처리를 하며 이후에는 `LogoutSuccessHandler`를 사용하여 로그아웃 후처리를 한다.
- LogoutHandler
  - CsrfLogoutHandler
  - SecurityContextLogoutHandler
- LogoutSuccessHandler
  - SimplUrlLogoutSuccessHandler

- `LogoutFilter`
```java
private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException {
    if (requiresLogout(request, response)) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Logging out [%s]", auth));
        }
        this.handler.logout(request, response, auth);
        this.logoutSuccessHandler.onLogoutSuccess(request, response, auth);
        return;
    }
    chain.doFilter(request, response);
}
```
- `CompositeLogoutHandler`(`LogoutHandler` 구현체로 여러 종류의 `LogoutHandler`를 가지고 있음.) 

```java
@Override
public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
    for (LogoutHandler handler : this.logoutHandlers) {
        handler.logout(request, response, authentication);
    }
}
```

- 로그아웃 필터 설정

```java
http.logout()
        .logoutUrl("/logout")
        .logoutSuccessUrl("/") 
        .logoutRequestMatcher()
        .invalidateHttpSession(true)
        .deleteCookies()
        .addLogoutHandler()
        .logoutSuccessHandler();
```

### 폼 인증 처리 필터: UsernamePasswordAuthenticationFilter
- 폼 로그인을 처리하는 인증 필터
  - 사용자가 폼에 입력한 username과 password로 `Authentcation`을 만들고 `AuthenticationManager`(`ProviderManager`)를 사용하여 인증을 시도한다.
  - `AuthenticationManager` (`ProviderManager`)는 여러 `AuthenticationProvider`를 사용하여 인증을 시도하는데, 그 중에 `DaoAuthenticationProvider`는 `UserDetailsServivce`를 사용하여 `UserDetails` 정보를 가져와 사용자가 입력한 password와 비교한다.
- `UsernamePasswordAuthenticationFilter`

```java
@Override
public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
        throws AuthenticationException {
    if (this.postOnly && !request.getMethod().equals("POST")) {
        throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
    }
    String username = obtainUsername(request);
    username = (username != null) ? username : "";
    username = username.trim();
    String password = obtainPassword(request);
    password = (password != null) ? password : "";
    UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
    // Allow subclasses to set the "details" property
    setDetails(request, authRequest);
    return this.getAuthenticationManager().authenticate(authRequest);
}
```
- `ProviderManager`

```java
@Override
public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    ...

    for (AuthenticationProvider provider : getProviders()) {
        if (!provider.supports(toTest)) {
            continue;
        }
        if (logger.isTraceEnabled()) {
            logger.trace(LogMessage.format("Authenticating request with %s (%d/%d)",
                    provider.getClass().getSimpleName(), ++currentPosition, size));
        }
        try {
            result = provider.authenticate(authentication);
            if (result != null) {
                copyDetails(authentication, result);
                break;
            }
        }
    }
    
    ...
}
```
- `DaoAuthenticationProvider`는 인증 완료 후 `UserDetails`를 포함하는 `Authentication`을 반환하고 이후 `UsernamePasswordAuthenticationFilter`의 추상 부모 클래스에서 쓰레드 변수로 `SecurityContext`를 저장한다.

### 로그인/로그아웃 폼 커스터마이징
- `DefaultLoginPageGeneratingFilter`, `DefaultLogoutPageGeneratingFilter`가 빠짐(기본 로그인, 로그아웃 폼 페이지를 생성해주는 필터), `LogoutFilter`는 그대로 있음

```java
http.formLogin().loginPage("/login").permitAll();
http.logout().logoutSuccessUrl("/");
```
- /login 처리하는 핸들러 코딩해야 하며 직접 로그인 폼을 만들어야 한다. 마찬가지로 /logout 처리하는 핸들러와 로그아웃 폼을 만들어야 한다.

### Basic 인증 처리 필터: BasicAuthenticationFilter
- **요청 헤더**에 username와 password를 실어 보내면 브라우저 또는 서버가 그 값을 읽어서 인증하는 방식. 예) Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
(keesun:123 을 BASE 64)
- 보통, 브라우저 기반 요청이 클라이언트의 요청을 처리할 때 자주 사용.
- 보안에 취약하기 때문에 반드시 HTTPS를 사용할 것을 권장.

### 요청 캐시 필터: RequestCacheAwareFilter
- 현재 요청과 관련 있는 캐시된 요청이 있는지 찾아서 적용하는 필터.
  - 캐시된 요청이 없다면, 현재 요청 처리
  - 캐시된 요청이 있다면, 해당 캐시된 요청 처리, 즉 /dashboard 요청 후 로그인 페이지로 redirect되서 로그인을 진행하면 관련 있는 과거 요청인 /dashboard로 다시 redirect 시켜준다

### 익명 인증 필터: AnonymousAuthenticationFilter
- 현재 `SecurityContext`에 `Authentication`이 `null`이면 “익명 Authentication”(`AnonymousAuthenticationToken`)을 만들어 넣어주고, `null`이 아니면 아무일도 하지 않는다.

```java
@Override
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
        throws IOException, ServletException {
    if (SecurityContextHolder.getContext().getAuthentication() == null) {
        SecurityContextHolder.getContext().setAuthentication(createAuthentication((HttpServletRequest) req));
        if (this.logger.isTraceEnabled()) {
            this.logger.trace(LogMessage.of(() -> "Set SecurityContextHolder to "
                    + SecurityContextHolder.getContext().getAuthentication()));
        } else {
            this.logger.debug("Set SecurityContextHolder to anonymous SecurityContext");
        }
    } else {
        if (this.logger.isTraceEnabled()) {
            this.logger.trace(LogMessage.of(() -> "Did not set SecurityContextHolder since already authenticated "
                    + SecurityContextHolder.getContext().getAuthentication()));
        }
    }
    chain.doFilter(req, res);
}

protected Authentication createAuthentication(HttpServletRequest request) {
    AnonymousAuthenticationToken token = new AnonymousAuthenticationToken(this.key, this.principal,
            this.authorities);
    token.setDetails(this.authenticationDetailsSource.buildDetails(request));
    return token;
}
```

### 세션 관리 필터: SessionManagementFilter
- 세션 변조 방지 전략 설정: sessionFixation
  - migrateSession (서블릿 3.0- 컨테이너 사용시 기본값)
  - **changeSessionId** (서브릿 3.1+ 컨테이너 사용시 기본값)
- 유효하지 않은 세션을 리다이렉트 시킬 URL 설정: `invalidSessionUrl`
- 동시성 제어: maximumSessions
  - 추가 로그인을 막을지 여부 설정 (기본값, false)
- 세션 생성 전략: sessionCreationPolicy 
  - IF_REQUIRED
  - NEVER
  - STATELESS
  - ALWAYS

### 인증/인가 예외 처리 필터: ExceptionTranslationFilter
- `ExceptionTranslatorFilter` -> `FilterSecurityInterceptor`(`AccessDecisionManager`, `AffrimativeBased`)
- `AuthenticationException` -> `AuthenticationEntryPoint`
- `AccessDeniedException` -> `AccessDeniedHandler`
- `AccessDeniedHandler` 커스터 마이징

```java
http.exceptionHandling().accessDeniedHandler(new AccessDeniedHandler() {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = principal.getUsername();
        System.out.println(username + " is denied to access " + request.getRequestURI());
        response.sendRedirect("/access-denied");
    }
});
```

### 토큰 기반 인증 필터 : RememberMeAuthenticationFilter
{% include gallery id="Security_6" %}

- `RememberMeAuthenticationFilter`: 세션이 사라지거나 만료가 되더라도 쿠키 또는 DB를 사용하여 저장된 토큰 기반으로 인증을 지원하는 필터

```java
private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException {
   ...
    
    Authentication rememberMeAuth = this.rememberMeServices.autoLogin(request, response);
    if (rememberMeAuth != null) {
        // Attempt authenticaton via AuthenticationManager
        try {
            rememberMeAuth = this.authenticationManager.authenticate(rememberMeAuth);
            // Store to SecurityContextHolder
            SecurityContextHolder.getContext().setAuthentication(rememberMeAuth);
            onSuccessfulAuthentication(request, response, rememberMeAuth);
           ...
        }
        
        ...
}
```

- `RememberMeAuthenticationFilter`에서 쿠키를 이용하여 `RememberMeAuthenticationToken`을 반환, 특유의 hashcode를 가지고 있다.
- `authenticationManager`: `PoviderManager`
- `AuthenticationProvider`: `RememberMeAuthenticationProvider`(특유의 hashcode를 비교하여 인증을 처리한다.), `DaoAuthenticationProvider`의 경우는 `UserDetailsService`에서 반환한 `UserDetails`의 패스워드를 기준으로 인증한다.
- `SecurityContext`에 `RememberMeAuthenticationToken`을 쓰레드 변수로 저장
- `RememberMeAuthenticationProvider`

```java
@Override
public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    if (!supports(authentication.getClass())) {
        return null;
    }
    if (this.key.hashCode() != ((RememberMeAuthenticationToken) authentication).getKeyHash()) {
        throw new BadCredentialsException(this.messages.getMessage("RememberMeAuthenticationProvider.incorrectKey",
                "The presented RememberMeAuthenticationToken does not contain the expected key"));
    }
    return authentication;
}
```

- 설정

```java
http.rememberMe() 
    .userDetailsService(accountService) 
    .key("remember-me-sample"); // 리멤버미 기능으로 사용할 쿠키의 이름
```

### 커스텀 필터 추가하기
```java
public class LoggingFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        ...
        chain.doFilter(request, response);
        ...
    }
}
```
```java
http.addFilterAfter(new LoggingFilter(), UsernamePasswordAuthenticationFilter.class);
```

## 스프링 시큐리티 그밖에
### 타임리프 스프링 시큐리티 확장팩
- Authentication 과 Authorization 참조

```yaml
implementation group: 'org.thymeleaf.extras', name: 'thymeleaf-extras-springsecurity5'
```

```html
<div th:if="${#authorization.expr('isAuthenticated()')}">
    <h2 th:text="${#authentication.name}"></h2>
    <a href="/logout" th:href="@{/logout}">Logout</a>
</div>
<div th:unless="${#authorization.expr('isAuthenticated()')}">
    <a href="/login" th:href="@{/login}">Login</a>
</div>
```

### sec 네임스페이스
```html
xmlns:sec="http://www.thymeleaf.org/extras/spring-security"
```
```html
<div sec:authorize="isAuthenticated()">
    <h2 sec:authentication="name">Name</h2>
    <a href="/logout" th:href="@{/logout}">Logout</a>
</div>
<div sec:authorize="!isAuthenticated()">
    <a href="/login" th:href="@{/login}">Login</a>
</div>
```

### 메소드 시큐리티
```java
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true, jsr250Enabled = true)
public class MethodSecurityConfig extends GlobalMethodSecurityConfiguration {
    @Override
    protected AccessDecisionManager accessDecisionManager() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        roleHierarchy.setHierarchy("ROLE_ADMIN > ROLE_USER");
        AffirmativeBased accessDecisionManager = (AffirmativeBased)
                super.accessDecisionManager();
        accessDecisionManager.getDecisionVoters().add(new
                RoleHierarchyVoter(roleHierarchy));
        return accessDecisionManager;
    }
}
```
- `@Secured`와 `@RollAllowed`
  - 메소드 호출 이전에 권한을 확인한다.
- `@PreAuthorize`와 `@PostAuthorize`
  - 메소드 호출 이전에 권한을 확인하고 반환값이 있는 경우 `@PostAuthorize`를 통해 권한 확인이 가능하다.

```java
@Service
public class SampleService {

//   @PreAuthorize("hasRole('USER')")
//   @PostAuthorize()
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public void dashboard() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        System.out.println(userDetails.getUsername());
    }
}
```
```java
@Test
// @WithMockUser
public void dashboard() throws Exception {
    Account account = new Account();
    account.setRole("ADMIN");
    account.setUsername("yhw");
    account.setPassword("123");
    accountService.createNew(account);

    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken("yhw", "123");
    Authentication authenticate = authenticationManager.authenticate(token);
    SecurityContextHolder.getContext().setAuthentication(authenticate);

    sampleService.dashboard();
}
```

### @AuthenticationPrincipal
- 커스텀 유저 클래스 구현하기

```java
public class UserAccount extends User {
    private final Account account;

    public UserAccount(Account account) {
        super(account.getUsername(), account.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_" + account.getRole())));
        this.account = account;
    }

    public Account getAccount() {
        return account;
    }
}
```
- `AccountService` 수정

```java
@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Account account = accountRepository.findByUsername(username);
    if (account == null) {
        throw new UsernameNotFoundException(username);
    }
    return new UserAccount(account);
}
```
```java
@AuthenticationPrincipal UserAccount userAccount
```
- `UserDetailsService` 구현체에서 리턴하는 객체를 매개변수로 받을 수 있다.
- 그 안에 들어있는 Account객체를 getter를 통해 참조할 수 있다.
  
```java
@AuthenticationPrincipal(expression = "#this == 'anonymousUser' ? null : account") Account account
```
- 익명 Authentication인 경우 (“anonymousUser”, `AnonymousAuthenticationToken`)에는 `null`, 아닌 경우에는 `account` 필드를 사용한다.
- Account를 바로 참조할 수 있다.

```java
@CurrentUser Account account

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
@AuthenticationPrincipal(expression = "#this == 'anonymousUser' ? null : account") 
public @interface CurrentUser {
}
```

### 스프링 데이터 연동
```yaml
implementation group: 'org.springframework.security', name: 'spring-security-data', version: '5.5.2'
```
```java
@Query("select b from Book b where b.author.id = ?#{principal.account.id}")
List<Book> findCurrentUserBooks();
```
 - 쿼리 메서드에서 `principal` 참조 가능

[1]: https://www.inflearn.com/course/백기선-스프링-시큐리티/dashboard








