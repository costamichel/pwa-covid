import React, { memo } from 'react';
import { Card, Typography, Button, Select, MenuItem } from '../../../components';
import COUNTRIES from '../../../commons/constants/countries';
import { CardPanelContentStyled, ItemStyled } from './style';

const navigatorHasShare = navigator.share;

function Panel ({ updatedAt, onChange, data, country, getCovidData }) {
    const { cases, recovered, deaths, todayDeaths, todayCases } = data;

    const renderCountries = (country, index) => (
        <MenuItem key={`country-${index}`} value={country.value}>
            <ItemStyled>
                <div>{country.label}</div>
                <img src={country.flag} alt={`País-${country.label}`} />
            </ItemStyled>
        </MenuItem>
    )

    const textCovid19 = `País: ${country}\nRecuperados: ${recovered}\nCasos ativos: ${cases}\nMortes: ${deaths}\nMortes hoje: ${todayDeaths}\nCasos hoje: ${todayCases}`;

    const shareInfo = () => {
        navigator.share({
            title: `Dados do COVID-19 - ${textCovid19}`,
            text: textCovid19,
            url: 'https://pwa-covid.netlify.app/'
        });
    }

    const copyInfo = () => {
        navigator.clipboard.writeText(textCovid19);
    }

    const renderShareButton = (
        <div>
            <Button variant="contained" color="primary" onClick={shareInfo} >
                Compartilhar
            </Button>
        </div>
    );

    const renderCopyButton = (
        <div>
            <Button variant="contained" color="primary" onClick={copyInfo} >
                Copiar
            </Button>
        </div>
    );

    return (
        <Card>
            <CardPanelContentStyled>
                <div>
                    <Typography variant="h5" component="span" color="primary">COVID-19</Typography>
                    <Typography variant="h6" component="span" color="primary">Painel Coronavírus</Typography>
                    <Typography variant="body2" component="span" color="primary">Atualizado em {updatedAt}</Typography>
                    <div className="pt-2">
                        <Select onChange={onChange} value={country}>
                            {COUNTRIES.map(renderCountries)}
                        </Select>
                    </div>
                </div>
                {navigatorHasShare ? renderShareButton : renderCopyButton}
            </CardPanelContentStyled>
        </Card>
    )
}

export default memo(Panel);