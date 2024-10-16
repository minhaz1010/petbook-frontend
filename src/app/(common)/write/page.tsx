/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera } from 'lucide-react';
import TitleInput from './_components/TitleInput';
import PostTypeSelector from './_components/PostTypeSelector';
import PremiumSelector from './_components/PremiumSelector';
import QuillEditor from '../../../components/Shared/QuillEditor';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Loading from '@/components/Shared/Loading';
import { jetbrains, roboto } from '@/config/font';
import { useCreatePost } from '@/hooks/post/useCreatePost.hook';
import { useRouter } from 'next/navigation';

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

export default function ResponsiveEditor() {
  const [postData, setPostData] = React.useState({
    title: '',
    content: '',
    postType: 'STORY',
    petType: 'Cat',
    isPremium: false,
    author: ''
  });

  const [imageData, setImageData] = React.useState<CloudinaryResult[] | null>();
  const [error, setError] = React.useState<string | null>(null);
  const { userId } = useAuth();
  const router = useRouter();
  const { mutate: handleCreatePost, isPending } = useCreatePost();

  const validateForm = useCallback(() => {
    if (!postData.title.trim() || !postData.content.trim() || !imageData) {
      setError("Please provide a title, content, and image for your post.");
    } else {
      setError(null);
    }
  }, [postData, imageData]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleSubmit = async () => {
    validateForm();
    if (error) return;
    const finalPostData = {
      title: postData.title,
      content: postData.content,
      petType: postData.petType,
      postType: postData.postType,
      author: userId,
      isPremium: postData.isPremium,
      image: imageData
    }
    // handleCreatePost(finalPostData);
    handleCreatePost(finalPostData, {
      onSuccess: () => {
        setImageData(null);
        router.push("/")
        setPostData({
          title: '',
          content: '',
          postType: 'STORY',
          petType: 'Cat',
          isPremium: false,
          author: ''
        });
      }
    });

  };

  const handleUploadSuccess = (result: any) => {
    const newImage = {
      secure_url: result.info.secure_url,
      public_id: result.info.public_id
    }
    setImageData((prevData) => {
      if (!prevData) return [newImage]
      return [...prevData, newImage]
    })
    setError(null);
  };



  const isFormValid = postData.title.trim() && postData.content.trim() && imageData && !error;

  return (
    <div className={`min-h-screen sm:-mt-36 md:mt-0 w-full p-4 md:p-6 lg:p-8 relative ${roboto.className}`}>
      <div className="max-w-4xl bg-white/5 backdrop-blur-md shadow-lg rounded-lg p-6 mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Create a New Post</h1>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <TitleInput
          value={postData.title}
          onChange={(title) => setPostData({ ...postData, title })}
        />
        <div className='flex flex-col'>
          <PostTypeSelector
            postType={postData.postType}
            petType={postData.petType}
            onPostTypeChange={(postType) => setPostData({ ...postData, postType })}
            onPetTypeChange={(petType) => setPostData({ ...postData, petType })}
          />
          <PremiumSelector
            isPremium={postData.isPremium}
            onChange={(isPremium) => setPostData({ ...postData, isPremium })}
          />
        </div>


        <QuillEditor
          content={postData.content}
          onChange={(content) => setPostData({ ...postData, content })}
        />

        <div className="mt-11">
          <div className="border-2 border-gray-300 rounded-lg p-4">
            <CldUploadWidget
              uploadPreset="gi3ax71p"
              // onUpload={(result) => handleUploadSuccess(result)}
              onSuccess={(result) => handleUploadSuccess(result)}
              options={{
                sources: ["local"]
              }}
            >
              {({ open }) => (
                <button
                  onClick={() => open()}
                  className="w-full h-24 flex flex-col items-center justify-center gap-2 text-white-500 hover:text-gray-700 transition-colors cursor-pointer bg-slate-500 hover:bg-gray-500 rounded-md"
                >
                  <Camera size={40} />
                  <p>Click to upload image</p>
                </button>
              )}
            </CldUploadWidget>
            <div className='flex gap-4 mt-3'>
              {imageData && imageData.map((image) => (
                <CldImage key={image.public_id} src={image.public_id} width={270} height={180} alt='Uploaded image' />
              ))
              }
            </div>


          </div>
        </div>

        <button
          onClick={handleSubmit}
          className={`mt-6 w-full py-2 px-4 rounded-md bg-blue-600 text-white font-bold 
            ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 transition-colors'}`}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
      {isPending && (
        <section className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-50">
          <Loading />
        </section>
      )}
    </div>
  );
}