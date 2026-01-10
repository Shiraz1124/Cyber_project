package aii.logic;



import java.util.List;
import java.util.Optional;

import aii.Boundary.UserBoundary;

public interface UserService {

	public UserBoundary createUser(UserBoundary newUser);

	public Optional<UserBoundary> login(String systemId, String userEmail, String password);

	public UserBoundary passwordChange(String oldPassword, String newPassword, String systemId, String userEmail);
	
	public void generatePasswordResetToken(String email);
	
	public void resetPassword(String email, String token, String newPassword);
	
	public List<UserBoundary>getAllUsers(String adminSystemID, String adminEmail);
	
	public Optional<UserBoundary> getSpecificUser(String SystemID, String adminEmail, String clientEmail);
	
	

}
