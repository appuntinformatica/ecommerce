package org.demo.backend.model;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "password_reset_token")
public class PasswordResetToken {

	private static final int EXPIRATION = 60 * 24;
	
	public PasswordResetToken(final String token, final Account account) {
        this.token = token;
        this.account = account;
        this.expiryDate = calculateExpiryDate(EXPIRATION);
    }
	 
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "prt_id")
	Long id;
	
	@Column(name = "prt_token", length = 256, nullable = false)
	String token;
	
	@OneToOne(targetEntity = Account.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "prt_account_id")
    Account account;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "prt_expiry_date", nullable = false)
	Date expiryDate;
	
	public void setToken(final String token) {
        this.token = token;
        this.expiryDate = calculateExpiryDate(EXPIRATION);
    }
	
	private Date calculateExpiryDate(final int expiryTimeInMinutes) {
        final Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Date().getTime());
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }
}
