import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { isNull } from 'util';
import Button from '../components/button';
import { userAuth } from '../context/auth';
import { User } from '../types/user';

const CreateAccount = () => {
  const { isLoading, isLoggedIn } = userAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const submit = (data: User) => {
    console.log(data);
  };

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    router.push('/login');
    return null;
  }

  return (
    <div className='container'>
      <h1>アカウント作成</h1>
      <form onSubmit={handleSubmit(submit)} className='space-y-6'>
        <div>
          <label className='block mb-0.5' htmlFor='name'>
            名前*
          </label>
          <input
            autoComplete='name'
            className={classNames('rounded border', errors.name ? 'border-red-500' : 'border-slate-300')}
            {...register('name', {
              required: '必須入力です',
              maxLength: {
                value: 50,
                message: '最大50文字です',
              },
            })}
            id='name'
            name='name'
            type='text'
          />
          {errors.name && <p className='text-red-500 mt-0.5'>{errors.name?.message}</p>}
        </div>
        <div>
          <label className='block mb-0.5' htmlFor='nickname'>
            ニックネーム*
          </label>
          <input
            autoComplete='off'
            className={classNames('rounded border', errors.name ? 'border-red-500' : 'border-slate-300')}
            {...register('nickname', {
              required: '必須入力です',
              maxLength: {
                value: 50,
                message: '最大50文字です',
              },
            })}
            id='nickname'
            name='nickname'
            type='text'
          />
          {errors.nickname && <p className='text-red-500 mt-0.5'>{errors.nickname?.message}</p>}
        </div>

        <div>
          <label className='block mb-0.5' htmlFor='profile'>
            プロフィール*
          </label>
          <textarea
            className={classNames('rounded border', errors.name ? 'border-red-500' : 'border-slate-300')}
            {...register('profile', {
              required: '必須入力です',
              maxLength: {
                value: 255,
                message: '最大255文字です',
              },
            })}
            id='profile'
            name='profile'
          />
          <p className='text-sm text-slate-400 leading-none'>{watch('profile')?.length || 0}/255</p>
          {errors.profile && <p className='text-red-500 mt-0.5'>{errors.profile?.message}</p>}
        </div>

        <Button>アカウント作成</Button>
      </form>
    </div>
  );
};

export default CreateAccount;
