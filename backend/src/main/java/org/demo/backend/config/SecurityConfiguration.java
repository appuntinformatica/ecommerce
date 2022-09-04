package org.demo.backend.config;

import org.demo.backend.model.Role;
import io.jsonwebtoken.spring.AuthEntryPointJwt;
import io.jsonwebtoken.spring.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "application")
public class SecurityConfiguration {
 
	private static final String[] PUBLIC_APIS = new String[] {
		 "/api/auth/**"
    };
	private static final String[] ROLE_ACCOUNT_APIS = new String[] {
		"/api/posts/**",
		"/api/upload/**",
		"/api/download/**"
		
   }; 

	@Bean
	public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
	    return new SecurityEvaluationContextExtension();
	}
	
    @Bean
    PasswordEncoder encryptedPasswordEncoder() {
    	return new BCryptPasswordEncoder();   /* return PlainTextPasswordEncoder.getInstance(); */
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
	
    @Bean
    AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Setter
	String[] origins;
    
    @Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
					.allowedOrigins(origins)
					.allowedMethods("*")
					.allowedHeaders("*");
			}
		};
	}
    
	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors()
    			.and()
        	.csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests() 
                .antMatchers(PUBLIC_APIS).permitAll()
            	.antMatchers(ROLE_ACCOUNT_APIS).hasAuthority( Role.ROLE_ACCOUNT.name() )
                .anyRequest().authenticated();
        
        http.headers().frameOptions().disable();

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
   	
}
