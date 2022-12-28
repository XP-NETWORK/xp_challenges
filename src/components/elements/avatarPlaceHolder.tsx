import * as React from 'react';



function getAvatarColor(letter:string) {
    const code = letter.toUpperCase().charCodeAt(0);
    let color;
    //['#00AA55', '#009FD4', '#B381B3', '#939393', '#E3BC00', '#D47500', '#DC2A2A'];
    //cyrillic capital letters from 1040 to 1071
    switch (true) {
      case code <= 1050:
        color = "#00AA55";
        break;
      case code <= 1060:
        color = "#009FD4";
        break;
      default:
        color = "#B381B3";
        break;
    }
  
    return color;
  }

export const AvaratPlaceHolder = ({username}: {username:string}) => {

    const l = username.at(0)?.toUpperCase() || 'A'

    const color = getAvatarColor(l);
//const randomElement = array[Math.floor(Math.random() * array.length)];

return <div className="avatarPlaceholder" style={{background: color}}>
    {username.at(0)?.toUpperCase()}
</div>
}