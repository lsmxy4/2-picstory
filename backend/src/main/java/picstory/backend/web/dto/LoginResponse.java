package picstory.backend.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private Long memberId;
    private String name;
    private String provider;
}
