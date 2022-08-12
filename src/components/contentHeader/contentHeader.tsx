import { Container } from "@mui/system"
import { FC } from "react"

import './contentHeader.scss'

const ContentHeader : FC<{currentCat : string}> = ({currentCat}) => {
    return (
        <Container>
            <div className="contentHeader">
                <p>{currentCat}</p>
            </div>
        </Container>
    )
}

export default ContentHeader
