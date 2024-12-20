"use client";

import FileInput from "@/components/FileInput";
import { CATEGORY, PROPERTIES } from "@/constants";
import { auth } from "@/firebase";
import { KeyboardEvent, useState } from "react";

const NO_SELECTION = "선택 안함";
const ETC = "기타";

export default function UploadPage() {
  const data = auth.currentUser;
  const [selectedMainCategory, setSelectedMainCategory] =
    useState(NO_SELECTION);
  const [beforeImage, setBeforeImage] = useState<File>();
  const [afterImage, setAfterImage] = useState<File>();
  const [loading, setLoading] = useState(false);

  const isSubmitActive =
    !loading &&
    beforeImage !== null &&
    afterImage !== null &&
    selectedMainCategory !== NO_SELECTION;

  function handleKeyDownOnForm(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  function handleKeyDownInInput(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();

      const form = event.currentTarget.form as HTMLFormElement;
      const index = Array.from(form.elements).indexOf(event.currentTarget);

      if (form.elements[index + 1]) {
        (form.elements[index + 1] as HTMLElement).focus();
      }
    }
  }

  function handleSubmit() {
    setLoading(true);
  }

  return (
    <form
      encType="multipart/form-data"
      method="POST"
      action={`/api/recipe?userid=${data?.uid}`}
      onKeyDown={handleKeyDownOnForm}
      onSubmit={handleSubmit}>
      <label>
        *레시피 이름
        <input
          maxLength={20}
          name="title"
          placeholder="ex. 지브리 감성 뭉게구름 보정법"
          required
        />
      </label>
      <hr />
      <fieldset className="flex *:flex-1 gap-4">
        <FileInput
          label="레시피 적용 전"
          setImage={setBeforeImage}
          id="beforeImage"
        />
        <FileInput
          label="레시피 적용 후"
          setImage={setAfterImage}
          id="afterImage"
        />
      </fieldset>
      <small>
        레시피기 적용되지 않았거나 부적절한 이미지는 삭제될 수 있어요
      </small>
      <label>
        *카테고리
        <fieldset className="flex">
          <select
            name="mainCategory"
            value={selectedMainCategory}
            onChange={(e) => setSelectedMainCategory(e.target.value)}>
            <option>{NO_SELECTION}</option>
            {CATEGORY.map((item) => (
              <option key={item.text}>{item.text}</option>
            ))}
            <option>{ETC}</option>
          </select>
          {selectedMainCategory === ETC ? (
            <input
              name="subCategory"
              placeholder="카테고리를 입력해주세요"
              required
            />
          ) : (
            selectedMainCategory !== NO_SELECTION && (
              <select name="subCategory">
                {CATEGORY.find(
                  (main) => main.text === selectedMainCategory
                )?.sub.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            )
          )}
        </fieldset>
      </label>

      <fieldset className="flex flex-wrap *:w-20">
        {PROPERTIES.map((item) => (
          <label key={item.key}>
            {item.name}
            <input
              type="number"
              name={item.key}
              max={item.max}
              min={item.min}
              maxLength={3}
              defaultValue={0}
              onKeyDown={handleKeyDownInInput}
              onFocus={(e) => (e.target.value = "")}
              onBlur={(e) => {
                if (e.target.value === "") {
                  e.target.value = "0";
                }
              }}
            />
          </label>
        ))}
      </fieldset>
      <label>
        설명 <textarea maxLength={300} name="description" />
      </label>

      <button
        type="submit"
        disabled={!isSubmitActive}
        aria-busy={loading}
        aria-label="업로드 중입니다...">
        레시피 등록하기
      </button>
    </form>
  );
}
