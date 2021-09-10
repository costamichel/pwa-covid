import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import Api from "../../api";
import { ContainerStyled } from "./style";
import Board from "./components/Board";
import Panel from "./components/Panel";
import { FooterStyled } from "./components/style";

function Main () {

    const [data, setData] = useState({});
    const [country, setCountry] = useState('brazil');
    const updatedAt = new Date().toLocaleString();

    const getCovidData = useCallback((country) => {
        Api.getCountry(country)
            .then((data) => setData(data));
    }, [])

    useEffect(() => {
        getCovidData(country);
    }, [getCovidData, country]);

    const handleChange = ({ target }) => {
        const country = target.value;
        setCountry(country);
    }

    return (
        <ContainerStyled>
            <div className='mb-2'>
                <Panel
                    data={data}
                    updatedAt={updatedAt}
                    onChange={handleChange}
                    country={country}
                    getCovidData={getCovidData}
                />
            </div>
            <Board data={data} />
            <FooterStyled>
                Developed by Michel Costa -
                <a href="https://github.com/costamichel/pwa-covid" target="_blank
                    ">See on Github</a>
            </FooterStyled>
        </ContainerStyled>
    )
}

export default memo(Main);