package com.ssafy.pettodoctor.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ResVO<T> {
    String message;
    T data;
}
