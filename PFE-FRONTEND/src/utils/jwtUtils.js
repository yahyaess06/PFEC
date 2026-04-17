export function decodeToken(token) {
    if (!token) return null;

    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

export function getUserRole() {
    const token = localStorage.getItem("token");
    const decoded = decodeToken(token);
    return decoded?.role || null;
}

export function getUserId() {
    const token = localStorage.getItem("token");
    const decoded = decodeToken(token);
    return decoded?.sub || null;
}
