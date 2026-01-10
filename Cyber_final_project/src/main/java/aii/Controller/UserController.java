package aii.Controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import aii.Boundary.NewUserBoundary;
import aii.Boundary.UserBoundary;
import aii.Boundary.UserId;
import aii.Exceptions.InvalidInputException;
import aii.logic.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/aii/users")
public class UserController {

	
	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	// Create a new user
	@PostMapping(path = "/newUserRegister" ,consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
	public UserBoundary newUserRegister(@RequestBody NewUserBoundary newUser) {
		return userService.createUser(new UserBoundary(new UserId("", newUser.getEmail()), newUser));
	}

	@GetMapping(path = "/login/{userEmail}/{password}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public UserBoundary loginUser(
			@PathVariable("userEmail") String userEmail, @PathVariable("password") String password) {
		return userService.login("", userEmail, password).orElseThrow(() -> new InvalidInputException("Incorrect password"));
	}

	@PutMapping(path = "/passwordChange/{userEmail}/{oldPassword}/{newPassword}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public void passwordChange(@PathVariable("userEmail") String userEmail,@PathVariable("oldPassword") String oldPassword,
			@PathVariable("newPassword") String newPassword) {
		userService.passwordChange(oldPassword, newPassword,"", userEmail);
	}
	
	@PostMapping(path = "/forgot-password/{email}",produces = { MediaType.APPLICATION_JSON_VALUE })
	public void forgotPassword(@PathVariable("email") String email) {
	    userService.generatePasswordResetToken(email);
	}
	@PutMapping(path = "/reset-password", produces = { MediaType.APPLICATION_JSON_VALUE })
	public void resetPassword(
	    @RequestParam (name = "email", required = true) String email,
	    @RequestParam (name = "resetCode", required = true) String token,
	    @RequestParam (name = "newPassword", required = true) String newPassword
	    ) {
	    
	    userService.resetPassword(email, token, newPassword);
	}

}
