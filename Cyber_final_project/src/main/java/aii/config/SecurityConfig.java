package aii.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(withDefaults()) // ✅ Enable CORS
            .csrf(AbstractHttpConfigurer::disable) // ✅ Disable CSRF for APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/swagger-ui/**",
                    "/v3/api-docs/**",
                    "/swagger-resources/**",
                    "/webjars/**",
                    "/h2-console/**",
                    "/aii/users/**",
                    "/aii/admin/**",
                    "/aii/sqli/**"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .headers(headers -> headers
                .frameOptions(frame -> frame.disable()) // ✅ Allow H2 console
            )
            .formLogin(withDefaults()) // ✅ Login page
            .httpBasic(withDefaults()); // ✅ Swagger support

        return http.build();
    }
}
