package pl.dominikb.iwa.message.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginForm {

    @NotBlank(message = "username cannot be empty")
    @Size(min = 3, max = 100, message = "size of the password is incorrect, must be between 6 and 100")
    private String username;

    @NotBlank(message = "username cannot be empty")
    @Size(min = 6, max = 100, message = "size of the password is incorrect, must be between 6 and 100")
    private String password;

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
}
