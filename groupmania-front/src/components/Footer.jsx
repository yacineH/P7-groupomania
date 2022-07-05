import React from 'react'
import styled from 'styled-components'

const FooterDiv = styled.footer`
    border: 1px solid #ffd7d7;
    padding-top: 8px;
    margin: 0px;
    background-color: #ffd7d7;
    text-align: center;
`

export default function Footer() {
    return (
        <FooterDiv>
            <p>Copyright © 2022-Tous droits résérvés</p>
        </FooterDiv>
    )
}
