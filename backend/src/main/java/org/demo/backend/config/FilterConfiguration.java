package org.demo.backend.config;

import org.demo.backend.filter.PostRequestResponseFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfiguration {
	
	@Autowired
	PostRequestResponseFilter postRequestResponseFilter;

	@Bean
	public FilterRegistrationBean<PostRequestResponseFilter> postUriFilter(){
	    FilterRegistrationBean<PostRequestResponseFilter> bean = new FilterRegistrationBean<>();
	        
	    bean.setFilter(postRequestResponseFilter);
	    bean.addUrlPatterns("/api/posts/*");
	    bean.setOrder(2);
	        
	    return bean;    
	}
	
}
