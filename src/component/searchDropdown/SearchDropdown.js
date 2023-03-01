import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { defaultTheme } from 'react-select';
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"
import { Link } from "react-router-dom";
import "./style.css"
const Dropdown = ({ children, isOpen, target, onClose }) => (
    <div css={{ position: 'relative' }}>
        {target}
        {isOpen ? <Menu>{children}</Menu> : null}
        {isOpen ? <Blanket onClick={onClose} /> : null}
    </div>
);
const Menu = props => {
    const shadow = 'hsla(218, 50%, 10%, 0.1)';
    return (
        <div
            css={{
                backgroundColor: 'white',
                borderRadius: 4,
                boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
                marginTop: 8,
                position: 'absolute',
                zIndex: 2,
            }}
            {...props}
        />
    );
};
const Blanket = props => (
    <div
        css={{
            bottom: 0,
            left: 0,
            top: 0,
            right: 0,
            position: 'fixed',
            zIndex: 1,
        }}
        {...props}
    />
);
const DropdownIndicator = () => (
    <div css={{ color: colors.neutral20, height: 24, width: 32 }}>
        <Svg>
            <path
                d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </Svg>
    </div>
);

const Svg = p => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        focusable="false"
        role="presentation"
        {...p}
    />
);
const { colors } = defaultTheme;
const SearchDropdown = ({ name, type, options, value, setValue, image, isOtherOpen, setIsOtherOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [currentCategory, setCurrentCategory] = useState(false);
    const [currentCategoryChange, setCurrentCategoryChange] = useState(false);

    const selectStyles = {
        control: provided => ({ ...provided, minWidth: 240, margin: 8 }),
        menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
    };
    useEffect(() => {
        setIsOpen(false);
    }, [isOtherOpen]);
    useEffect(() => {
        if (currentCategory === true) {
            setIsOpen(!isOpen);
        }
    }, [currentCategoryChange])
    const toggleOpen = () => {
        if (type === "coin") {
            setIsOpen(!isOpen);
        }
        else {
            setIsOtherOpen(!isOtherOpen);
            setCurrentCategory(true);
            setCurrentCategoryChange(!currentCategoryChange);
        }

    }
    const onSelectChange = (value) => {
        toggleOpen();
        setValue(value);
    }

    return (
        <>
            <Dropdown
                isOpen={isOpen}
                onClose={toggleOpen}
                target={
                    <Link to="" onClick={toggleOpen} className={`filter-category filter-category-${type}`} ><img alt="" style={{ display: value ? "none" : "" }} src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${image}.png`} />{value ? <div><img alt="" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${value.image}.png`} />{value.label}</div> : name} <RiArrowDownSLine className="down" /><RiArrowUpSLine className="top" /></Link>
                }
            >
                <Select
                    autoFocus
                    backspaceRemovesValue={false}
                    components={{ DropdownIndicator, IndicatorSeparator: null }}
                    controlShouldRenderValue={false}
                    hideSelectedOptions={false}
                    isClearable={false}
                    menuIsOpen
                    onChange={onSelectChange}
                    options={options}
                    formatOptionLabel={item => (<div><img alt="" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.image}.png`} />{item.label}</div>)}
                    placeholder="Search..."
                    styles={selectStyles}
                    tabSelectsValue={false}
                    value={value}
                    className="selectinput"
                />
            </Dropdown>
        </>
    )
}
export default SearchDropdown;