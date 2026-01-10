package aii.data;




import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import aii.Boundary.RoleEnum;
import aii.Boundary.UserId;
import aii.Utility.MapToStringConverter;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "USERS")
public class UserEntity {
	@Id
	private String userId;
	private String username;
	private String password;
	@Enumerated(EnumType.STRING)
	private RoleEnum role;
	
	private String resetToken;
	private long resetTimestamp; // in milliseconds
	
	private int loginAttempts;
	@Temporal(TemporalType.TIMESTAMP)
	private Date lastFailedLoginTime;
	
	@Lob
	@Convert(converter = MapToStringConverter.class)
	private LinkedHashMap<String, String> passwordHistory;

	public UserEntity() {
	}

	private String consturctId(String systemID, String email) {
		return systemID + "@@" + email;
	}

	public String getUserId() {
		return userId;
	}
	
	public void setUserId(UserId userId) {
		this.userId = consturctId(userId.getSystemID(), userId.getEmail());
	}
	
	public UserId generateUserId() {
		String[] parts = this.userId.split("@@");
	    return new UserId( parts[0], parts[1]);
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getResetToken() {
		return resetToken;
	}

	public void setResetToken(String resetToken) {
		this.resetToken = resetToken;
	}

	public long getResetTimestamp() {
		return resetTimestamp;
	}

	public void setResetTimestamp(long resetTimestamp) {
		this.resetTimestamp = resetTimestamp;
	}

	public int getLoginAttempts() {
		return loginAttempts;
	}

	public void setLoginAttempts(int loginAttempts) {
		this.loginAttempts = loginAttempts;
	}

	public Date getLastFailedLoginTime() {
		return lastFailedLoginTime;
	}

	public void setLastFailedLoginTime(Date lastFailedLoginTime) {
		this.lastFailedLoginTime = lastFailedLoginTime;
	}

	public LinkedHashMap<String, String> getpasswordHistory() {
		return passwordHistory;
	}

	public void setpasswordHistory(LinkedHashMap<String, String> passwordHistory) {
		this.passwordHistory = passwordHistory;
	}

	public RoleEnum getRole() {
		return role;
	}

	public void setRole(RoleEnum role) {
		this.role = role;
	}

	




}
