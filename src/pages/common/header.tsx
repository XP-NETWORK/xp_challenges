import { useState, FC, useEffect } from "react";
import logo from "../../assets/img/icons/logo.png";
import Menu from "../../components/modals/menu";
import UserWallet from "components/auth/UserWallet";
import { useNavigate } from "react-router";
import { Dummyx } from "../../components/auth/Dummy";
import { useSelector } from "react-redux";
import { ReduxState } from "store";

const BurgerBtn = ({
    menuOpen,
    menuHandler,
}: {
    menuOpen: boolean;
    menuHandler: any;
}) => {
    return (
        <div
            onClick={menuHandler}
            className={`burgerBtn ${menuOpen ? "close" : ""}`}
        ></div>
    );
};

//withTimer
export const Header: FC = () => {
    const [menuOpen, toggleMenu] = useState(false);
    const [needHelp, setNeedHelp] = useState(false);
    const { telegramUser } = useSelector((state: ReduxState) => ({
        telegramUser: state.global.telegramUser,
    }));
    const nav = useNavigate();

    const menuHandler = () => {
        document.body.classList.contains("showModal")
            ? document.body.classList.remove("showModal")
            : document.body.classList.add("showModal");
        toggleMenu(menuOpen ? false : true);
    };

    useEffect(() => {
        const loadTelegramUniqueId = localStorage.getItem("telegramUnique");
        if (loadTelegramUniqueId) {
            setNeedHelp(true);
        }
    }, [telegramUser]);

    return (
        <div className="headerWrapper">
            <header className="header" id="header">
                <div className="iconBackground" onClick={() => nav("/")}>
                    <img src={logo} alt="logo" className="logo" />
                    <div className="XPTitleStyle">XP.CHALLENGE</div>
                </div>
                <div className="headerWrapper-right flexRow">
                    {needHelp && <Dummyx mode="desk" />}
                    <UserWallet />
                    <BurgerBtn menuOpen={menuOpen} menuHandler={menuHandler} />
                </div>
                {menuOpen && <Menu close={menuHandler} />}
            </header>
        </div>
    );
};
