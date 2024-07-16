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
        return fetch(process.env.BASE_URL + "/api/languages/", this.requestOptions)
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
        return fetch(process.env.BASE_URL + "/api/skills/", this.requestOptions)
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
        return fetch(process.env.BASE_URL + "/api/extracurricular/", this.requestOptions)
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
        return fetch(process.env.BASE_URL + "/api/tools/", this.requestOptions)
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
        return fetch(process.env.BASE_URL + "/api/projects/", this.requestOptions)
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

    // POST
    static postAdd = async (api, taskEnter) => {
        return fetch(process.env.BASE_URL + api, {
            method: "POST",
            body: JSON.stringify({ task: taskEnter }),
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.API_TOK,
            },
        }).catch((err) => {
            console.error(err);
            throw new Error("Network error or unexpected response");
        });
    };

    // Delete
    static deleteAll = async (api) => {
        fetch(process.env.BASE_URL + api, {
            method: "DELETE",
            body: JSON.stringify({ task: { method: "all" } }),
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.API_TOK,
            },
        }).catch((err) => {
            console.error(err);
            throw new Error("Network error or unexpected response");
        });
    };
}

export default apiService;
