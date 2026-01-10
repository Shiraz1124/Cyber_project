package aii.Boundary;



public class NewUserBoundary {
private String email;
private String username;
private String password;
private RoleEnum role;

public NewUserBoundary() {
	
}

public NewUserBoundary(String email, String username, String password, RoleEnum role) {
	
	this.email = email;
	this.username = username;
	this.password = password;
	this.role = role;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
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

public RoleEnum getRole() {
	return role;
}

public void setRole(RoleEnum role) {
	this.role = role;
}

@Override
public String toString() {
	return "NewUserBoundary [email=" + email + ", username=" + username + "]";
}






}
