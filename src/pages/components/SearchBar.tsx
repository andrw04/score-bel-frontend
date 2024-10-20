import { TextField } from '@mui/material'
import { FC, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

type PropsType = {
    onSearch: (searchValue: string) => void
}

export const SearchBar: FC<PropsType> = ({
    onSearch,
}) => {
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
        onSearch(event.target.value)
    }

    const handleClearSearch = () => {
        setSearchValue('')
        onSearch('')
    }

    return (
        <TextField
            placeholder='Search'
            value={searchValue}
            onChange={handleSearch}
            size='small'
            style={{
                background: 'background.default'

            }}
            InputProps={{
                startAdornment: (
                    <SearchIcon/>
                )
            }}
        />
    )
}
