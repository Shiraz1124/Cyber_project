package aii.logic;


import aii.Boundary.RoleEnum;

import aii.Boundary.UserBoundary;
import aii.Boundary.UserId;
import aii.Exceptions.InvalidInputException;
import aii.Exceptions.UnauthorizedAccessException;
import aii.Exceptions.UserNotFoundException;
import aii.Utility.PasswordValidator;
import aii.Utility.UserConverter;
import aii.config.PasswordPolicyConfig;
import aii.dal.UsersCrud;
import aii.data.UserEntity;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;




@Service
public class UserServiceImplementation implements UserService {

	private final UsersCrud usersCrud;
	private UserConverter userConverter;
	private PasswordPolicyConfig passwordPolicyConfig;
	private final JavaMailSender mailSender;
	private String systemId;
	private Log logger = LogFactory.getLog(UserServiceImplementation.class);

	@Value("${spring.application.name:network.communication.security}")
	public void setSystemId(String systemId) {
		this.systemId = systemId;
		this.logger.info("****** " + this.systemId);
	}

	public UserServiceImplementation(UsersCrud usersCrud, UserConverter userConverter, PasswordPolicyConfig passwordPolicyConfig, JavaMailSender mailSender) {
		this.usersCrud = usersCrud;
		this.userConverter = userConverter;
		this.passwordPolicyConfig = passwordPolicyConfig;
		this.mailSender = mailSender;
	}
	
		public void validatePassword(String password) {
			PasswordValidator.validate(password, passwordPolicyConfig);
		}
		public void checkLast3Passwords(LinkedHashMap<String, String> passwordHistory, String plainPassword) {
			PasswordValidator.checkLast3Passwords(passwordHistory, plainPassword, passwordPolicyConfig);
		}
	
	 // Generate a BCrypt hashed password
	    public static String hashPassword(String plainPassword) {
	        return BCrypt.hashpw(plainPassword, BCrypt.gensalt(12)); // 12 is the work factor (can be increased for more security)
	    }

	    // Validate a plain password against the stored hash
	    public static boolean matchPassword(String plainPassword, String hashedPassword) {
	        return BCrypt.checkpw(plainPassword, hashedPassword);
	    }

	@Override
	@Transactional
	public UserBoundary createUser(UserBoundary user) {
		this.logger.trace("createUser(" + user + ")");
		
		if (user == null) {
			throw new InvalidInputException("User cannot be null");
		}
		
		if(user.getUsername() == null || user.getUsername().isEmpty()) {
			throw new InvalidInputException("Username cannot be null or empty");
		}
		
		user.setUserId(new UserId(this.systemId,user.getUserId().getEmail()));
		
		if(!validEmail(user.getUserId())) {
			throw new InvalidInputException("Invalid email address");
		}
		
		validatePassword(user.getPassword());

		
		if (usersCrud.existsById(user.getUserId().getSystemID() +"@@"+user.getUserId().getEmail())) {
			throw new InvalidInputException("User with the same ID already exists: " + user.getUserId());
	    }
		String hashedPassword;
		 try {
	            hashedPassword =hashPassword(user.getPassword());
	            user.setPassword(hashedPassword);
	        } catch (Exception e) {
	            throw new RuntimeException("Error while hashing password", e);
	        }


		UserEntity entity = userConverter.toEntity(user);
		entity.setpasswordHistory(new LinkedHashMap<>());
		entity.getpasswordHistory().put(LocalDateTime.now().toString(), hashedPassword);
		usersCrud.save(entity);
		return userConverter.toBoundary(entity);
	}

	@Override
	@Transactional
	public Optional<UserBoundary> login(String systemId, String userEmail, String password) {
	    this.logger.trace("login(systemId: " + systemId + ", userEmail: " + userEmail + ")");

	    if (userEmail == null || userEmail.isEmpty()) {
	        throw new InvalidInputException("User email cannot be null or empty");
	    }

	    systemId = this.systemId; // override

	    Optional<UserEntity> optional = usersCrud.findById(this.systemId+"@@"+userEmail);
	    if (!optional.isPresent()) {
	        throw new UserNotFoundException("No user with this email: "+userEmail);
	    }

	    UserEntity user = optional.get();

	    
	    if (user.getLoginAttempts() == passwordPolicyConfig.getMaxLoginAttempts()) {
	        if (user.getLastFailedLoginTime() != null) {
	            Date now = new Date();
	            Date unlockTime = new Date(user.getLastFailedLoginTime().getTime() + 2 * 60 * 1000); // 2 minutes later
	            if (now.before(unlockTime)) {
	                throw new InvalidInputException("Account locked. Try again after 2 minutes.");
	            } else {
	                // Unlock after 2 minutes
	                user.setLoginAttempts(0);
	                user.setLastFailedLoginTime(null);
	            }
	        }
	    }   
	    if (!matchPassword(password, user.getPassword())) {
	    	this.logger.trace("The password is not validate");
	    	  user.setLoginAttempts(user.getLoginAttempts() + 1);
	  	    user.setLastFailedLoginTime(new Date());
	  	    usersCrud.save(user);
	        this.logger.trace("The number of login attempts is :"+user.getLoginAttempts() );
	        this.logger.trace("The LastFailedLoginTime is :"+user.getLastFailedLoginTime() );
	        

	        return Optional.empty(); // Let the controller throw the exception
	    		 
	    }
	    // ✅ Reset login attempts on success
	    user.setLoginAttempts(0);
	    user.setLastFailedLoginTime(null);
	    usersCrud.save(user);

	    return Optional.of(userConverter.toBoundary(user));
	}


	@Override
	@Transactional
	public UserBoundary passwordChange(String oldPassword, String newPassword, String systemId, String userEmail) {
		systemId= this.systemId;
		Optional<UserEntity> entityOp = this.usersCrud
				.findById(systemId + "@@" + userEmail);
		if (!entityOp.isEmpty()){
			UserEntity updatedUser = entityOp.get();
			
			String newHashPassword;
			if (!matchPassword(oldPassword,updatedUser.getPassword())) {
				throw new InvalidInputException("Incorrect password");
			}else {
				validatePassword(newPassword);
				checkLast3Passwords(updatedUser.getpasswordHistory(), newPassword);
				newHashPassword = hashPassword(newPassword);
				updatedUser.setPassword(newHashPassword);
			}
			updatedUser.getpasswordHistory().put(LocalDateTime.now().toString(), newHashPassword);
			return this.userConverter.toBoundary( 
					this.usersCrud.save(updatedUser));
			
		}else {
			throw new UserNotFoundException ("Could not find user by email: " + userEmail);
		}
	}
	
	@Override
	@Transactional
	public void generatePasswordResetToken(String email) {
	    Optional<UserEntity> optional = usersCrud.findById(this.systemId+"@@"+email);
	    if (!optional.isPresent()) {
	        throw new UserNotFoundException("No user with this email.");
	    }

	    UserEntity user = optional.get();

	    // Generate a token and hash it with SHA-1
	    String token = Base64.getEncoder().encodeToString(
	        (email + System.currentTimeMillis()).getBytes()
	    );
	    String sha1Token = sha1(token);

	    user.setResetToken(sha1Token);
	    user.setResetTimestamp(System.currentTimeMillis());

	    this.usersCrud.save(user);
	    
	    // ✅ Send email to the user
	    SimpleMailMessage message = new SimpleMailMessage();
	    message.setTo(email);
	    message.setSubject("Your Password Reset Code");
	    message.setText("Hello,\n\nYour reset code is:\n\n" + token + "\n\nIt expires in 15 minutes.");
	    mailSender.send(message);

	    logger.info("✅ Email sent to: " + email);

	    logger.info("Mock email sent to " + email + " with reset code: " + token);
	}
	
	@Override
	@Transactional
	public void resetPassword(String email, String token, String newPassword) {
	    Optional<UserEntity> optional = usersCrud.findById(this.systemId+"@@"+email);
	    if (!optional.isPresent()) {
	        throw new UserNotFoundException("User not found");
	    }

	    UserEntity user = optional.get();
	    String hashedInputToken = sha1(token);
	    
	    logger.info("Stored hash: " + user.getResetToken());
	    logger.info("Input hash: " + hashedInputToken);

	    if (!hashedInputToken.equals(user.getResetToken())) {
	        throw new InvalidInputException("Invalid reset token");
	    }

	    long currentTime = System.currentTimeMillis();
	    if (currentTime - user.getResetTimestamp() > 15 * 60 * 1000) {
	        user.setResetToken(null);
	        user.setResetTimestamp(0);
	        usersCrud.save(user);
	        throw new InvalidInputException("Reset token expired");
	    }
	    validatePassword(newPassword);
	    checkLast3Passwords(user.getpasswordHistory(), newPassword);
	    String hashedPassword = hashPassword(newPassword);
	    user.getpasswordHistory().put(LocalDateTime.now().toString(), hashedPassword);

	    user.setPassword(hashedPassword);
	    user.setResetToken(null);
	    user.setResetTimestamp(0);
	    usersCrud.save(user);
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<UserBoundary>getAllUsers(String adminSystemID, String adminEmail) {
		adminSystemID= this.systemId;
		this.logger.trace("getAllUsers( "+"adminSystemID: " + adminSystemID +"adminEmail: "+adminEmail+")");
		RoleEnum role  = getUserRole(adminSystemID,adminEmail);
		if(role== RoleEnum.ADMIN) {
				return this.usersCrud
						.findAll()
						.stream()
						.map(this.userConverter::toBoundary)
						.toList();
			}
		throw new UnauthorizedAccessException("Only the ADMIN is allowed to retrieve the users list");
		
	}
	
	@Override
	@Transactional(readOnly = true)
	public Optional<UserBoundary> getSpecificUser(String SystemID, String adminEmail, String clientEmail) {
		SystemID= this.systemId;
		this.logger.trace("getSpecificUser( "+"SystemID: " + SystemID +"adminEmail: "+adminEmail+"clientEmail: " + clientEmail+")");
		RoleEnum role  = getUserRole(SystemID,adminEmail);
		if(role== RoleEnum.ADMIN) {
			return usersCrud.findById(systemId + "@@" + clientEmail).map(userConverter::toBoundary).or(() -> {
				throw new UserNotFoundException("User not found with email: " + clientEmail);
			});
		}
		throw new UnauthorizedAccessException("Only the ADMIN is allowed to retrieve the client data");
		
	}
	
	public RoleEnum getUserRole(String userSystemID, String userEmail) {
		if (!userSystemID.equals(this.systemId)) {
			userSystemID = this.systemId;
		}
		if (userEmail == null || userEmail.isEmpty()) {
			throw new InvalidInputException("User email cannot be null or empty");
		}
		Optional<UserEntity> user = this.usersCrud.findById(userSystemID+ "@@" + userEmail);
		if (user == null || !user.isPresent()) {
			throw new UserNotFoundException("User not found with email: " + userEmail + "and systemID: " + userSystemID);
		}
		return user.get().getRole();
	}


	

	private String sha1(String input) {
	    try {
	        MessageDigest mDigest = MessageDigest.getInstance("SHA-1");
	        byte[] result = mDigest.digest(input.getBytes());
	        StringBuilder sb = new StringBuilder();
	        for (byte b : result) {
	            sb.append(String.format("%02x", b));
	        }
	        return sb.toString();
	    } catch (Exception e) {
	        throw new RuntimeException("Error creating SHA-1 hash", e);
	    }
	}

	 public boolean validEmail(UserId userId) {
		    // Get an instance of the EmailValidator
		    EmailValidator emailValidator = EmailValidator.getInstance();

		    // Validate the email
		    return emailValidator.isValid(userId.getEmail());
	    }

	 

}