package aii.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/aii/sqli")
public class SQLI_UserController {

    @Autowired
    private JdbcTemplate jdbc;

// SECTION 3    
//    	{
//    	  "email": "shiraz@gmail.com",
//    	  "password": "' OR '1'='1"
//    	}
//    
//    SELECT * FROM users WHERE user_id = 'network.communication.security@@shiraz@gmail.com' AND password = '' OR '1'='1'
//✅ Always true → attacker bypasses check    
    
    @PostMapping("/vulnerable-login")
    public Map<String, Object> vulnerableLogin(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String password = data.get("password");

        String systemId = "network.communication.security";

        String query = "SELECT * FROM users WHERE user_id = '" + systemId + "@@" + email + "' AND password = '" + password + "'";
        List<Map<String, Object>> result = jdbc.queryForList(query);

        if (result.isEmpty())
            throw new RuntimeException("Login failed");

        Map<String, Object> user = new HashMap<>();
        user.put("username", result.get(0).get("username"));
        user.put("email", email);
        user.put("role", result.get(0).get("role")); // או ADMIN לצורך בדיקה

        return user;
    }
    
    // SECTION 3 - SECURE LOGIN using Parameterized Queries ✅
    @PostMapping("/secure-login")
    public Map<String, Object> secureLogin(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String password = data.get("password");
        String systemId = "network.communication.security";
        
        // ✅ SECURE: Using parameterized query with ? placeholders
        String query = "SELECT * FROM users WHERE user_id = ? AND password = ?";
        List<Map<String, Object>> result = jdbc.queryForList(query, systemId + "@@" + email, password);
        
        if (result.isEmpty())
            throw new RuntimeException("Login failed");
            
        Map<String, Object> user = new HashMap<>();
        user.put("username", result.get(0).get("username"));
        user.put("email", email);
        user.put("role", result.get(0).get("role"));
        return user;
    }
    
    
// SECTION 1    
//    	{
//    	  "email": "test@example.com",
//    	  "password": "abc'); DROP TABLE users; --"
//    	}
//
//    INSERT INTO users (...) VALUES (..., 'abc'); DROP TABLE users; --');

    @PostMapping("/vulnerable-register")
    public String vulnerableRegister(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String password = data.get("password");
        String systemId = "network.communication.security";

        String query = "INSERT INTO users (login_attempts, reset_timestamp, user_id, username, password) VALUES (0, " + 
        		System.currentTimeMillis() + ", '" + systemId + "@@" + email + "', 'attacker', '" + password + "')";
        jdbc.execute(query);  // ⚠️ VULNERABLE
        return "User registered: " + email;
    }
    
    // SECTION 1 - SECURE REGISTER using Parameterized Queries ✅
    @PostMapping("/secure-register")
    public String secureRegister(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String password = data.get("password");
        String systemId = "network.communication.security";
        
        // ✅ SECURE: Using parameterized query with ? placeholders
        String query = "INSERT INTO users (login_attempts, reset_timestamp, user_id, username, password) VALUES (?, ?, ?, ?, ?)";
        jdbc.update(query, 0, System.currentTimeMillis(), systemId + "@@" + email, "attacker", password);
        
        return "User registered: " + email;
    }
    

    
// SECTION 4
// adminEmail=admin@example.com' OR '1'='1
// SELECT * FROM users WHERE user_id = 'network.communication.security@@admin@example.com' OR '1'='1' AND role = 'ADMIN'
//✅ Always true → attacker bypasses check
//✅ All users returned even without real admin email    
    
    @GetMapping("/vulnerable-get-all")
    public List<Map<String, Object>> unsafeGetAll(@RequestParam("adminEmail") String adminEmail) {
        String systemId = "network.communication.security";
        
        // ⚠️ VULNERABLE: email is directly concatenated into the query
        String query = "SELECT * FROM users WHERE user_id = '" + systemId + "@@" + adminEmail + "' AND role = 'ADMIN'";
        List<Map<String, Object>> result = jdbc.queryForList(query);
        
        if (result.isEmpty()) {
            throw new RuntimeException("❌ Access denied (not an admin)");
        }
        
        // If passed — return all users
        return jdbc.queryForList("SELECT * FROM users");
    }
    
 // SECTION 4 - SECURE GET ALL using Parameterized Queries ✅
    @GetMapping("/secure-get-all")
    public List<Map<String, Object>> secureGetAll(@RequestParam("adminEmail") String adminEmail) {
        String systemId = "network.communication.security";
        
        // ✅ SECURE: Using parameterized query with ? placeholders
        String query = "SELECT * FROM users WHERE user_id = ? AND role = ?";
        List<Map<String, Object>> result = jdbc.queryForList(query, systemId + "@@" + adminEmail, "ADMIN");
        
        if (result.isEmpty()) {
            throw new RuntimeException("❌ Access denied (not an admin)");
        }
        
        return jdbc.queryForList("SELECT * FROM users");
    }



}

