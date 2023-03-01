import React from "react";
import "./style.css"
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"
import { Link } from "react-router-dom";
const TableFilterCategory = ({ name, type }) => {
    return (
        <>
            <Link to="" className={`filter-category filter-category-${type}`} >{name} <RiArrowDownSLine className="down" /><RiArrowUpSLine className="top" /></Link>
        </>
    )
}
export default TableFilterCategory;