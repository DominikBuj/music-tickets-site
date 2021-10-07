package pl.dominikb.iwa.message.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

public class SignUpForm {

    @NotBlank(message = "username cannot be empty")
    @Size(min = 3, max = 100, message = "size of the username is incorrect, must be between 3 and 100")
    private String username;

    @NotBlank(message = "username cannot be empty")
    @Size(min = 6, max = 100, message = "size of the password is incorrect, must be between 6 and 100")
    private String password;

    private Set<String> role;

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

    public Set<String> getRole() {
        return role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }
}
