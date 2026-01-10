package aii.Boundary;



public class UserBoundary {
	private UserId userId;
	private String username;
	private String password;
	private RoleEnum role;

	public UserBoundary() {

	}

	public UserBoundary(UserId userId, NewUserBoundary newuser) {
		this.userId = userId;
		this.username = newuser.getUsername();
		this.password = newuser.getPassword();
		this.role = newuser.getRole();

	}

	public UserId getUserId() {
		return userId;
	}

	public void setUserId(UserId userId) {
		this.userId = userId;
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
		return "UserBoundary [userId=" + userId + ", username=" + username + ", password=" + password + "]";
	}	


	




}
