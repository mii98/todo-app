import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header__top">
                <div className="header__brand">
                    <img
                        className="header__logo"
                        src="/favicon.png"
                        alt=""
                        width="40"
                        height="40"
                    />

                    <span className="header__brand-name">Daylist</span>
                </div>

                <p className="header__workspace">Personal workspace</p>
            </div>

            <div className="header__intro">
                <div className="header__heading">
                    <p className="header__eyebrow">A SPACE TO FOCUS</p>

                    <h1 className="header__title">
                        A little structure.
                        <span className="header__title-accent">A clearer day.</span>
                    </h1>
                </div>

                <p className="header__description">
                    Keep your tasks in one place, focus on what matters, and move forward
                    at your own pace.
                </p>
            </div>
        </header>
    );
}

export default Header;