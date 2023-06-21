import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { FormField, Loader } from '../components';
import axios from 'axios';
import Type from '../utils/Type';
import Select from 'react-select'

const CreatePost = () => {

  const Options = [
    [],
    [
      { value: 'boy-0', label: "Basic" },
      { value: 'boy-1', label: "Literary"},
      { value: 'boy-3', label: "Sports" },
      { value: 'boy-4', label: "Beautification" },
      { value: 'boy-5', label: "Mature and steady"},
      { value: 'boy-6', label: "Ink wash painting" },
      { value: 'boy-7', label: "Oil painting"},
      { value: 'boy-8', label: "Detail enhancement"},
      { value: 'boy-9', label: "Sunny boy"},
      { value: 'boy-11',label: "Face slimming" },
      { value: 'boy-12',label: "Aestheticism"},
      { value: 'boy-14',label:  "Marvel"},
      { value: 'boy-16',label:  "Zelda"},
      { value: 'boy-23', label:  "One Piece"},
      { value: 'boy-24', label:  "Smile"},
      { value: 'boy-27', label:  "Big eyes"}
    ],
    [
      { value: 'girl-0', label: "Sweet" },
      { value: 'girl-1', label: "Loli"},
      { value: 'girl-2', label: "Beautification" },
      { value: 'girl-3', label: "Beautification + Big eyes" },
      { value: 'girl-4', label: "Beautification + Smile"},
      { value: 'girl-6', label: "Gaming" },
      { value: 'girl-7', label: "Anime, comics and games (ACG)"},
      { value: 'girl-11', label: "Detail enhancement"},
      { value: 'girl-12', label: "Color sketch"},
      { value: 'girl-13',label: "Pure" },
      { value: 'girl-16',label: "Zelda"},
      { value: 'girl-17',label:  "Oil painting"},
      { value: 'girl-19',label:  "The Snow Queen"},
      { value: 'girl-20', label:  "ALice in Wonderland"},
      { value: 'girl-21', label:  "Work Attire"},
      { value: 'girl-23', label:  "Chinese Hanfu"}
    ],
    [
      { value: 'pet-0', label: "Basic III" },
      { value: 'pet-1', label: "Basic II"},
      { value: 'pet-2', label: "Basic III" },
    ],
    [
      { value: 'scene-0',label: "Basic" },
      { value: 'scene-1', label: "Ed Mell"},
      { value: 'scene-2',label:  "Jessica Rossier"},
      { value: 'scene-3',label:  "Violet"},
      { value: 'scene-4', label:  "Ian McQue"},
      { value: 'scene-5', label:  "Alice in Wonderland"},
    ],
    [
      { value: 'boys-0',label: "Basic I" },
      { value: 'boys-1', label: "Basic II"},
    ],
    [
      { value: 'girls-0',label: "Basic" },
      { value: 'girls-2', label: "Beautification"},
      { value: 'girls-3',label:  "Detail enhancement"},
    ],
    [
      { value: 'people-0',label: "Basic I" },
      { value: 'people-1', label: "Basic II"},
      { value: 'people-2',label:  "Basic III"},
    ]
    ];



  const navigate = useNavigate();

  const [photoType,setPhotoType]=useState({id:0,name:'Auto'});

  const [form, setForm] = useState({
    desc: '',
    photo: '',
    result: '',
    type: 'default',
  });

  const [types,setTypes]=useState([{name:"Auto",checked:true},{name:"Male",checked:false},
  {name:"Female",checked:false},{name:"Animal",checked:false},{name:"Landscape",
  checked:false},{name:"Group Male",checked:false},{name:"Group Female",checked:false},
  {name:"People",checked:false}]);

  
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSelect = (choice) => {
    setForm({ ...form, type: choice.value });
  }

  const handleUpload = async (e) => {
      const file = e.target.files[0];
      console.log(file);
      const res = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    setForm({...form, photo: res});
  }

  const handleCheckbox = (e) =>{
      const id = e.target.id;
      const name = e.target.name;
      const newTypes = [...types];
      newTypes[photoType.id].checked=false;
      newTypes[id].checked=true
      setTypes(newTypes);
      setPhotoType({id:id,name: name});
  }

  const generateImage = async () => {
    if(form.photo && form.type) {
      try {
        setGeneratingImg(true);
        const response = await axios.post('http://localhost:3000/api/cartoon', {
            photo: form.photo,
            type: form.type,
          });
        const data = response.json();
        setForm({ ...form, result: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please upload any photo');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.desc && form.result) {
      setLoading(true);
      try {
        const response = await fetch('https://localhost:3000/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ desc, result, type }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative caarton version of anything and share it with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <FormField
            labelName="Description"
            type="text"
            name="desc"
            placeholder="Ex., Sports,Marvel.."
            value={form.desc}
            handleChange={handleChange}
          />
          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="userImg"
                className="block text-m font-medium text-gray-900"
              >
                Upload Image
              </label>
            </div>
            <input type="file" name="userImg" accept="image/*" 
              className="rounded-sm text-sm font-medium text-black-600
              focus:ring-[#6469ff] focus:border-[#6469ff] pt-2" 
              onChange={handleUpload}
            />
          </div>
          <div>
          <div className='flex items-center gap-2'>
            <label className="text-m font-medium text-gray-900 mb-3">
              Select Photo Category
            </label>
          </div>
            <div className='flex gap-4 flex-wrap '>
              {types.map((type,index)=>{
                return <Type key={index} id={index} type={type} handleCheckbox={handleCheckbox}/>
              })}
            </div>
          </div>
          {photoType.name!="Auto" && 
          <div>
            <div className='flex items-center gap-2'>
              <label className="text-m font-medium text-gray-900 mb-3">
                Pick Cartoon Style to Generate
              </label>
            </div>
            <Select options={Options[photoType.id]} isSearchable onChange={(choice)=>handleSelect(choice)}/>
          </div>}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            { form.result && (
              <img
                src={form.result}
                alt={form.desc}
                className="w-full h-full object-contain"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;