package aii.Controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aii.Boundary.NewUserBoundary;
import aii.Boundary.RoleEnum;
import aii.Boundary.UserBoundary;
import aii.Boundary.UserId;
import aii.logic.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/aii/admin")
public class AdminController {
	
	private UserService userService;
	
	public AdminController(UserService userService) {
		this.userService = userService;
	}
	
	
	// Create a new end user
	@PostMapping(path = "/create_endUser",consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
	public UserBoundary newUserRegister(@RequestBody NewUserBoundary newUser) {
		return userService.createUser(new UserBoundary(new UserId("", newUser.getEmail()), newUser));
	}
	
	@GetMapping(path = "/getAllUsers", produces = MediaType.APPLICATION_JSON_VALUE)
	public UserBoundary[] exportAllUsers(
	        @RequestParam(name = "adminEmail", required = true) String email) {

	    return userService.getAllUsers("", email).toArray(new UserBoundary[0]);
	}
	
	@GetMapping(path = "/getSpecificUser", produces = MediaType.APPLICATION_JSON_VALUE)
	public Optional<UserBoundary> getSpecificUser(
	        @RequestParam(name = "adminEmail", required = true) String adminEmail, 
	        @RequestParam(name = "clientEmail", required = true) String clientEmail) {

	    return userService.getSpecificUser("",adminEmail,clientEmail);
	}




}
