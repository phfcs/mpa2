import {useState} from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './style.css';

export const Upload = ({onSuccess}) => {
    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        setFiles(e.target.files)
    };

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        for(let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }

        await axios.post('//localhost:8081/bob/api/upload', data)
            .then((response) => {
                navigate('/mpa2', {state:{props: response.data}});
            })
            .catch((e) => {
                toast.error('Upload Error');
            })
    };

    return (
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <div className="form-group files">
                <input type="file"
                       onChange={onInputChange}
                       className="form-control"
                       multiple/>
            </div>

            <button>Submit</button>
        </form>
    )
};