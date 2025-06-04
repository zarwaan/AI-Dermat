export function addHeader(element){
    const user = Cookies.get('userInfo')

    const header = Object.assign(document.createElement('div'),{
        className: 'head-z'
    });

    const title = Object.assign(document.createElement('div'),{
        id: "title-z",
        textContent: "AI Dermat",
        onclick: () => window.open('/',"_self")
    });

    const profileLink = Object.assign(document.createElement('a'),{
        href : user ? '/profile' : '/login'
    });

    const profile = Object.assign(document.createElement('div'),{
        className: "profile-z"
    });

    const icon = Object.assign(document.createElement('i'),{
        className: user ? "bi bi-person-fill" : "bi bi-box-arrow-in-right"
    })

    const text = Object.assign(document.createElement('span'),{
        className: "profile-text-z",
        textContent: user ? JSON.parse(user).username : "Login"
    })

    profile.append(icon, text);
    profileLink.append(profile);
    header.append(title, profileLink);
    element.insertBefore(header, element.firstChild);
}