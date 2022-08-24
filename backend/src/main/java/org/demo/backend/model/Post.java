package org.demo.backend.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) /* https://stackoverflow.com/questions/24994440/no-serializer-found-for-class-org-hibernate-proxy-pojo-javassist-javassist */
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "post")
public class Post implements Serializable {

	private static final long serialVersionUID = 1L;

	public Post() { }

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "po_id")
	Long id;

	@JsonIgnore
	@Version
	@Column(name = "po_version")
	Long version;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "po_account_id", nullable = false)
	Account account;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "po_datetime", nullable = false)
	Date datetime;
	
	@Column(name = "po_title", length = 100, nullable = false)
	String title;
	
	@Column(name = "po_content", columnDefinition = "text")
	String content;
	
}
