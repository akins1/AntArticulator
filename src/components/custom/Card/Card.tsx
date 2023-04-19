import React, { useEffect, useState } from "react";
import "./Card.css"

export default function Card({ children }: { children: React.ReactNode }) {

    return (
        <div className="cardContainer">

            { children }
        </div>
    );
}

Card.Header = CardHeader;
Card.Section = CardSection;
Card.Div = CardDiv;


function CardHeader ({ children }: { children: React.ReactNode }) {

    return (
        <div className="cardHeader">
            { children }
        </div>
    )
}

function CardSection ({ children }: { children: React.ReactNode }) {

    return (
        <div className="cardBody">
            { children }
        </div>
    )
}

function CardDiv () {

    return (
        <div className="cardDivider"></div>
    )
}
