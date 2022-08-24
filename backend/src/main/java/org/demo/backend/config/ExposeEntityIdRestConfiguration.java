package org.demo.backend.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import org.demo.backend.model.Post;

@Configuration
public class ExposeEntityIdRestConfiguration implements RepositoryRestConfigurer {

	@Autowired
	EntityManager entityManager;
	
	@SuppressWarnings("rawtypes")
	@Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
     //    config.exposeIdsFor(Account.class, Post.class);
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		List<Class> entityClasses = new ArrayList<>();
		
		entities.forEach(e -> {
			entityClasses.add(e.getJavaType());
		});
		
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
		
		HttpMethod[] theUnsupportedActions = { HttpMethod.DELETE, HttpMethod.PATCH };
		
		config.getExposureConfiguration()
			.forDomainType(Post.class)
			.withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
			.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
    
}
