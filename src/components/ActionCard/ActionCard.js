import React from 'react';
import './ActionCard.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import { IconButton } from '@material-ui/core';

function ActionCard(props) {
    return(
        <div className="actionCard" >
            <div className="actionCard__row">
                <div className="actionCard__sum" >{props.data.sum.toFixed(2)}</div>
                <div className="actionCard__date" >{props.data.date}</div>
                <div className="actionCard__category" >{props.data.category}</div>
                <IconButton  color="secondary" >
                   <HighlightOffIcon className="actionCard__delete"/>
                </IconButton>
            </div>
      </div>
    );
}

export default ActionCard;
