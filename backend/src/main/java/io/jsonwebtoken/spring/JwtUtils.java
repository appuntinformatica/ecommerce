package io.jsonwebtoken.spring;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
public class JwtUtils {
	@Value("${bezkoder.app.jwtSecret}")
	private String jwtSecret;

	@Value("${bezkoder.app.jwtExpirationMs}")
	private int jwtExpirationMs;

	public JwtResponse generateJwtResponse(Authentication authentication) {
		log.info("{}", authentication.getPrincipal());
		UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
		
		SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
	
		Date expiration = new Date((new Date()).getTime() + jwtExpirationMs);

	    String token = Jwts.builder()
	        .setSubject(userPrincipal.getUsername())
	        .setIssuedAt(new Date())
	        .setExpiration(expiration)
	        .signWith(key, SignatureAlgorithm.HS256)
	        .compact();
	    
	    return JwtResponse.builder()
	    			.token(token)
	    			.username(userPrincipal.getUsername())
	    			.expiration(expiration)
	    		.build();
	}

	public String getUserNameFromJwtToken(String token) {
		JwtParserBuilder b = Jwts.parserBuilder().setSigningKey(jwtSecret.getBytes());
		JwtParser parser = b.build();
		return parser.parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateJwtToken(String authToken, HttpServletResponse response) {
		try {
			log.info("authToken = {}", authToken);
			JwtParserBuilder b = Jwts.parserBuilder().setSigningKey(jwtSecret.getBytes());
			JwtParser parser = b.build();
			parser.parseClaimsJws(authToken);
			return true;
	    } catch (SecurityException e) {
	    	log.error("SecurityException JWT signature: {}", e.getMessage());
	    } catch (MalformedJwtException e) {
	    	log.error("Invalid JWT token: {}", e.getMessage());
	    } catch (ExpiredJwtException e) {
	    	log.error("JWT token is expired: {}", e.getMessage());
	    	response.setHeader("jwtMessage", JwtMessages.TOKEN_EXPIRED.name());
	    } catch (UnsupportedJwtException e) {
	    	log.error("JWT token is unsupported: {}", e.getMessage());
	    } catch (IllegalArgumentException e) {
	    	log.error("JWT claims string is empty: {}", e.getMessage());
	    }
	    return false;
	}
}
