package picstory.backend.service;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;
import picstory.backend.config.KakaoProperties;
import picstory.backend.domain.Member;
import picstory.backend.repository.MemberRepository;
import picstory.backend.web.dto.KakaoTokenResponse;
import picstory.backend.web.dto.KakaoUserResponse;
import picstory.backend.web.dto.MemberResponse;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    private final KakaoProperties kakaoProperties;
    private final RestClient restClient = RestClient.create();

    private final MemberRepository memberRepository;

    private static final String LOGIN_MEMBER_ID = "LOGIN_MEMBER_ID";

    public String getAuthorizationUrl(){
        validateKakaoOAuthProperties();

        return UriComponentsBuilder
                .fromUriString("https://kauth.kakao.com/oauth/authorize")
                .queryParam("client_id", kakaoProperties.getClientId())
                .queryParam("redirect_uri", kakaoProperties.getRedirectUri())
                .queryParam("response_type", "code")
                 .queryParam("prompt", "login")
                .build()
                .toString();
    }

    private void validateKakaoOAuthProperties() {
        if (!StringUtils.hasText(kakaoProperties.getClientId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Kakao REST API key is missing. Set KAKAO_CLIENT_ID or VITE_KAKAO_REST_API_KEY."
            );
        }

        if (!StringUtils.hasText(kakaoProperties.getRedirectUri())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Kakao redirect URI is missing. Set KAKAO_REDIRECT_URI."
            );
        }
    }

    public MemberResponse login(String code, HttpSession session){
        validateKakaoOAuthProperties();

        KakaoTokenResponse token =  requestToken(code);

        KakaoUserResponse kakaoUser =requestUserInfo(token.getAccessToken());

        Member member = memberRepository.findByKakaoId(kakaoUser.getId())
                .orElseGet(() -> saveNewKakaoMember(kakaoUser));
        session.setAttribute(LOGIN_MEMBER_ID,member.getId());

        return MemberResponse.from(member);

    }

    private KakaoTokenResponse requestToken(String code){
        MultiValueMap<String,String> body = new LinkedMultiValueMap<>();
        body.add("grant_type","authorization_code");
        body.add("client_id",kakaoProperties.getClientId());
        body.add("redirect_uri",kakaoProperties.getRedirectUri());
        body.add("code",code);

        if(StringUtils.hasText(kakaoProperties.getClientSecret())){
            body.add("client_secret",kakaoProperties.getClientSecret());
        }
 log.info("Kakao token request. tokenUri={}", kakaoProperties.getTokenUri());
    log.info("Kakao token request. clientId={}", kakaoProperties.getClientId());
    log.info("Kakao token request. redirectUri={}", kakaoProperties.getRedirectUri());
    log.info("Kakao token request. codeExists={}", StringUtils.hasText(code));
    log.info("Kakao token request. clientSecretExists={}", StringUtils.hasText(kakaoProperties.getClientSecret()));

        try {
            KakaoTokenResponse token = restClient.post()
                    .uri(kakaoProperties.getTokenUri())
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(body)
                    .retrieve()
                    .body(KakaoTokenResponse.class);

            if (token == null || !StringUtils.hasText(token.getAccessToken())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "Kakao token response did not include an access token."
                );
            }

            return token;
        } catch (RestClientResponseException ex) {
                log.warn("Kakao token request failed. status={}, body={}",
            ex.getStatusCode(),
            ex.getResponseBodyAsString());
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Kakao token request failed. Check that KAKAO_REDIRECT_URI exactly matches the redirect URI registered in Kakao Developers.",
                    ex
            );
        }
    }

    private KakaoUserResponse requestUserInfo(String accessToken){
        try {
            KakaoUserResponse kakaoUser = restClient.get()
                    .uri(kakaoProperties.getUserInfoUri())
                    .header("Authorization","Bearer "+accessToken)
                    .retrieve()
                    .body(KakaoUserResponse.class);

            if (kakaoUser == null || kakaoUser.getId() == null) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "Kakao user response did not include an id."
                );
            }

            return kakaoUser;
        } catch (RestClientResponseException ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Kakao user info request failed.",
                    ex
            );
        }
    }

    private Member saveNewKakaoMember(KakaoUserResponse kakaoUser) {
        Member member = createKakaoMember(kakaoUser);

        if (memberRepository.existsByEmail(member.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A member with this Kakao account email already exists. Please log in with email/password first."
            );
        }

        try {
            return memberRepository.saveAndFlush(member);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Kakao account could not be linked because the email or Kakao id already exists.",
                    ex
            );
        }
    }

    private Member createKakaoMember(KakaoUserResponse kakaoUser){
        String name = "kakao"+ kakaoUser.getId();
        String email ="kakao"+kakaoUser.getId() + "@kakao.local";

        if(kakaoUser.getKakaoAccount()!=null){
            if(kakaoUser.getKakaoAccount().getEmail()!=null){
                email=kakaoUser.getKakaoAccount().getEmail();
            }
            if(kakaoUser.getKakaoAccount().getProfile()!=null
                    && kakaoUser.getKakaoAccount().getProfile().getNickname() !=null
            ){
                name= kakaoUser.getKakaoAccount().getProfile().getNickname();
            }



        }
        return new Member(
                name,
                email,
                "KAKAO_LOGIN",
                null,
                kakaoUser.getId(),
                "KAKAO"
        );
    }

}