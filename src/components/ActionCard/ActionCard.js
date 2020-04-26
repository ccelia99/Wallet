import React from 'react';
import './ActionCard.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';

function ActionCard(props) {
    return(
        <div className="actionCard" >
            <div className="actionCard__row">
                <div className="actionCard__sum" >{props.data.sum.toFixed(2)}</div>
                <div className="actionCard__date" >{props.data.date}</div>
                <div className="actionCard__category" >{props.data.category}</div>
                <HighlightOffIcon className="actionCard__delete" color="secondary" />
            </div>
      </div>
    );
}

export default ActionCard;
