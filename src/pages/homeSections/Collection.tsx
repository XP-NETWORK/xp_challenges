
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition   */
/* eslint-disable @typescript-eslint/ban-ts-comment   */

import  React, {useEffect, useState} from 'react';

import { withServices, ServiceContainer } from "hocs/withServices";

import { setLeaders } from "store/reducer/global";

import { useDispatch, useSelector } from "react-redux";

import { ReduxState } from "../../store/index";

import {importAll} from '../../utils'

const Collection = () => {
    const [pics, setPics] = useState<string[]>([]);

    useEffect(() => {
//@ts-ignore
const images:string[] = importAll(
    //@ts-ignore
    require.context("../../assets/img/nfts", false, /\.(png|jpe?g|svg)$/)
  );
    const dublicate:string[] = []
    setPics(images.filter((img:string) => {
        if (dublicate.includes(img)) return false
        dublicate.push(img)
        return true
    }));

    }, [])


    return <div className="collection">
        <div className="container">
            <div className="row">
                <div className="col-12">
                        <h2 className='collectionHeader'>Collection</h2>
                        <p>Try to complete all the tastks</p>
                        <button className="accent">Enroll now</button>
                        <div className="row">
                            {
                                pics.map((pic, index) => <div key={`collection-${index}`} className="collection-item col-12 col-md-6 col-lg-4 col-xl-3">
                                   <div className="picWrapper">
                                     <img src={pic} alt={`collection-${index}`} />
                                     <span>@tyshh</span>
                                   </div>
                                </div>)
                            }
                        </div>
                </div>
            </div>
        </div>
    </div>
}


export default Collection