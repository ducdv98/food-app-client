import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { login } from '../store/auth.store';

import { phoneRegExp } from "../common/regex-patterns";

export default function Login() {

    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, []);

    const { from } = location.state || { from: { pathname: "/" } };

    const validationSchema = Yup.object().shape({
        phone_number: Yup.string()
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ.')
            .test(
                "len",
                "Số điện thoại không hợp lệ.",
                (val) =>
                    val &&
                    val.toString().length >= 9 &&
                    val.toString().length <= 11
            )
            .required("Số điện thoại không được để trống!"),
        password: Yup.string()
            .test(
                "len",
                "Mật khẩu phải dài hơn 6 kí tự.",
                (val) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40
            )
            .required("Mật khẩu không được để trống!"),
    });

    const handleLogin = (formValue) => {
        const { phone_number, password } = formValue;

        dispatch(login({ phone_number, password }))
            .unwrap()
            .then(() => {
                history.replace(from);
            })
            .catch(() => {
            });
    };

    return (
        <>
            <div className="h-5/6 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Đăng nhập</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Formik
                            initialValues={{ phone_number: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                handleLogin(values);
                            }}>
                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Số điện thoại
                                    </label>

                                    <Field name="phone_number" >
                                        {({
                                            field,
                                            form: { touched, errors },
                                            meta,
                                        }) => (
                                            <div>
                                                <input type="text" placeholder="Số điện thoại của bạn" {...field}
                                                    className={
                                                        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" + (meta.touched && meta.error ? 'border-2 border-red-500' : '')
                                                    } />
                                                {meta.touched && meta.error && (
                                                    <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mật khẩu
                                    </label>

                                    <Field name="password">
                                        {({
                                            field,
                                            form: { touched, errors },
                                            meta,
                                        }) => (
                                            <div>
                                                <input type="password" placeholder="Mật khẩu" {...field}
                                                    className={
                                                        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" + (meta.touched && meta.error ? 'border-2 border-red-500' : '')
                                                    } />
                                                {meta.touched && meta.error && (
                                                    <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>

                                <div>
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-100">
                                        {
                                            loading
                                                ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                : null
                                        }
                                        Đăng nhập
                                    </button>
                                </div>
                            </Form>
                        </Formik>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Chưa có tài khoản?
                                        <Link to='register' className='ml-2 text-blue-500 font-bold'>Đăng ký ngay</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}