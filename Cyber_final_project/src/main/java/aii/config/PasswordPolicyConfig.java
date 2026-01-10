package aii.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PasswordPolicyConfig {

    @Value("${password.minLength:10}")
    private int minLength;

    @Value("${password.requireUppercase:true}")
    private boolean requireUppercase;

    @Value("${password.requireLowercase:true}")
    private boolean requireLowercase;

    @Value("${password.requireDigit:true}")
    private boolean requireDigit;

    @Value("${password.requireSpecial:true}")
    private boolean requireSpecial;

    @Value("${password.historyCount:3}")
    private int historyCount;

    @Value("${password.maxLoginAttempts:3}")
    private int maxLoginAttempts;
    

    public int getMinLength() { return minLength; }
    public boolean isRequireUppercase() { return requireUppercase; }
    public boolean isRequireLowercase() { return requireLowercase; }
    public boolean isRequireDigit() { return requireDigit; }
    public boolean isRequireSpecial() { return requireSpecial; }
    public int getHistoryCount() { return historyCount; }
    public int getMaxLoginAttempts() { return maxLoginAttempts; }
}
