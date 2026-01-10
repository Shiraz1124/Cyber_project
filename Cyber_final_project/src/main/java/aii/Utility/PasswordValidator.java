package aii.Utility;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.crypto.bcrypt.BCrypt;

import aii.Exceptions.InvalidInputException;
import aii.config.PasswordPolicyConfig;

public class PasswordValidator {
    public static void validate(String password, PasswordPolicyConfig config) {

        if (password == null || password.isEmpty()) {
            throw new InvalidInputException("Password must not be empty.");
        }

        if (password.length() < config.getMinLength()) {
        	throw new InvalidInputException("Password must be at least " + config.getMinLength() + " characters long.");
        }

        if (config.isRequireUppercase() && !password.matches(".*[A-Z].*")) {
        	throw new InvalidInputException("Password must contain at least one uppercase letter.");
        }

        if (config.isRequireLowercase() && !password.matches(".*[a-z].*")) {
        	throw new InvalidInputException("Password must contain at least one lowercase letter.");
        }

        if (config.isRequireDigit() && !password.matches(".*\\d.*")) {
        	throw new InvalidInputException("Password must contain at least one digit.");
        }

        if (config.isRequireSpecial() && !password.matches(".*[^a-zA-Z0-9].*")) {
        	throw new InvalidInputException("Password must contain at least one special character.");
        }
        //Prevent common (dictionary) passwords
        String[] dictionary = { "Password123!", "Admin123!", "qwerty", "letmein", "admin" }; // Add more if needed
        for (String word : dictionary) {
            if (password.equals(word)) {
                throw new InvalidInputException("The password is too common and not secure.");
            }
        }

    }
    public static void checkLast3Passwords(LinkedHashMap<String, String> passwordHistory, String newPassword, PasswordPolicyConfig config) {
        if (passwordHistory != null && !passwordHistory.isEmpty()) {
            int historyCount = config.getHistoryCount();

            // Sort entries by timestamp key
            List<Map.Entry<String, String>> sortedEntries = passwordHistory.entrySet()
                .stream()
                .sorted(Comparator.comparing(e -> LocalDateTime.parse(e.getKey())))
                .collect(Collectors.toList());

            // Take the last N entries
            int size = sortedEntries.size();
            List<Map.Entry<String, String>> recentEntries = sortedEntries.subList(Math.max(size - historyCount, 0), size);

            for (Map.Entry<String, String> entry : recentEntries) {
                if (BCrypt.checkpw(newPassword, entry.getValue())) {
                    throw new InvalidInputException("Please enter a new password that hasn't been used recently.");
                }
            }
        }
    }


}
