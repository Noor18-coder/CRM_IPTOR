import React from "react";
import { CompanyInfoItem } from "../../../helpers/Api/models";
import VectorImg from "../../../assets/images/check_circle.svg";
import { Image} from "react-bootstrap";

export interface Props {
  companies: CompanyInfoItem[];
  doClick: (key: string) => void;
}

export const Company: React.FC<Props> = ({ companies, doClick }) => {
  return (
    <ul className="companys-list-item">
      {companies.map((obj) => {
        return (
          <li key={obj.companyCode}>
            <div
              className={"company-container"}
              onClick={() => doClick(obj.companyCode)}
              key={obj.companyCode}
            >
              <div className={"center"}>
                <div className={"test"}>{obj.name}</div>
                <Image
                  className={"company-selection-img"}
                  style={{ display: obj.selected ? "block" : "none" }}
                  src={VectorImg}
                  alt="company"
                  title="company"
                ></Image>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
