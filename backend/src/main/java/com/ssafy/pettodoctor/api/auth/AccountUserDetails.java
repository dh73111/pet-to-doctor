package com.ssafy.pettodoctor.api.auth;

//import com.ssafy.db.entity.User;
import com.ssafy.pettodoctor.api.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 부가 상세정보(활성화 여부, 만료, 롤 등) 정의.
 */
public class AccountUserDetails implements UserDetails {
	@Autowired
	Account account;
	boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentialNonExpired;
    boolean enabled = false;
    List<GrantedAuthority> roles = new ArrayList<>();
    
    public AccountUserDetails(Account account) {
    		super();
    		this.account = account;
		this.roles.add(new SimpleGrantedAuthority(account.getRole()));
    }
    
    public Account getUser() {
    		return this.account;
    }
	@Override
	public String getPassword() {
		return this.account.getPassword();
	}
	@Override
	public String getUsername() {
		return this.account.getEmail();
	}
	public Long getUserId() { return this.account.getId();}
	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}
	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return this.credentialNonExpired;
	}
	@Override
	public boolean isEnabled() {
		return this.enabled;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles;
	}
	public void setAuthorities(List<GrantedAuthority> roles) {
		this.roles = roles;
	}
}
