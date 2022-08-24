package org.demo.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import org.springframework.web.servlet.config.annotation.CorsRegistry;

import lombok.Setter;

@ConfigurationProperties(prefix = "application")
@Configuration
public class CustomRestMvcConfiguration {

    @Setter
	String[] origins;
    
	@Bean
	public RepositoryRestConfigurer repositoryRestConfigurer() {
		return new RepositoryRestConfigurer() {
			@Override
			public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
				config.setBasePath("/api");

				cors.addMapping("/api/**")
					.allowedOrigins(origins)
					.allowedHeaders("*");
			}
	    };
    }
	

}