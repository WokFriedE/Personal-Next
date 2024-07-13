"use server";

class apiService {
    static requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: process.env.API_TOK,
        },
    };

    // Lang
    static fetchLangData = () => {
        return fetch("http://localhost:3000/api/languages/", this.requestOptions)
            .then((response) => {
                if (response.status === 401) {
                    throw new Error("Invalid Token");
                } else if (!response.ok) {
                    throw new Error("Call back error: /api/languages/");
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Network error or unexpected response:", error);
                throw error;
            });
    };
    // Skills
    static fetchSkillsData = () => {
        return fetch("http://localhost:3000/api/skills/", this.requestOptions)
            .then((response) => {
                if (response.status === 401) {
                    throw new Error("Invalid Token");
                } else if (!response.ok) {
                    throw new Error("Call back error: /api/skills/");
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Network error or unexpected response:", error);
                throw error;
            });
    };
    // Extracurricular
    static fetchExtracurricularData = () => {
        return fetch("http://localhost:3000/api/extracurricular/", this.requestOptions)
            .then((response) => {
                if (response.status === 401) {
                    throw new Error("Invalid Token");
                } else if (!response.ok) {
                    throw new Error("Call back error: /api/extracurricular/");
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Network error or unexpected response:", error);
                throw error;
            });
    };
    // Tools
    static fetchToolsData = () => {
        return fetch("http://localhost:3000/api/tools/", this.requestOptions)
            .then((response) => {
                if (response.status === 401) {
                    throw new Error("Invalid Token");
                } else if (!response.ok) {
                    throw new Error("Call back error: /api/tools/");
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Network error or unexpected response:", error);
                throw error;
            });
    };

    // Projects
    static fetchProjectsData = () => {
        return fetch("http://localhost:3000/api/projects/", this.requestOptions)
            .then((response) => {
                if (response.status === 401) {
                    throw new Error("Invalid Token");
                } else if (!response.ok) {
                    throw new Error("Call back error: /api/projects/");
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Network error or unexpected response:", error);
                throw error;
            });
    };
}

export default apiService;
