
import React, { useState, useEffect } from 'react'
export const getToken = () => {
    // get token from local storage
    const token = "localStorage.getItem('suzieToken')"
    return {
        token: token
    };
}