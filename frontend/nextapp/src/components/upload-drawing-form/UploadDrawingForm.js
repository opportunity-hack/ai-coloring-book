"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button, TextInput, Select, Text, Group, rem, CloseButton } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX, IconConfetti } from "@tabler/icons-react";
import styles from "./upload-drawing-form.module.css";
import Captcha from "@/components/captcha/Captcha";
import SchoolSelect from "@/components/school-select/SchoolSelect";
import { GRADES } from "@/data/grades";
import { uploadDrawing } from "@/lib/api";
import { generateCaptcha, validateCaptcha } from "@/lib/captcha";
import { trackDrawingUploadSuccess } from "@/lib/analytics";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function SuccessPanel({ school, onReset }) {
  return (
    <div className={styles.successPanel}>
      <IconConfetti size={64} stroke={1.4} color="#12b886" aria-hidden="true" />
      <h2 className={styles.successTitle}>Your drawing is in!</h2>
      <p className={styles.successBody}>
        It will be turned into a coloring page
        {school ? ` for ${school}'s book` : ""}. Thank you for sharing your
        art — it&apos;s going to make someone&apos;s day brighter.
      </p>
      <div className={styles.successActions}>
        <Button size="lg" onClick={onReset}>
          Upload another drawing
        </Button>
        <Button size="lg" variant="outline" color="dark" component={Link} href="/">
          Back to home
        </Button>
      </div>
    </div>
  );
}

export default function UploadDrawingForm() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [subject, setSubject] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState(null);
  const [createdBy, setCreatedBy] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedSchool, setSubmittedSchool] = useState("");
  const formTopRef = useRef(null);

  useEffect(() => {
    setCaptchaValue(generateCaptcha());
  }, []);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const clearError = (field) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleDrop = (files) => {
    setFile(files[0]);
    clearError("file");
  };

  const handleReject = () => {
    setErrors((prev) => ({
      ...prev,
      file: "That file didn't work — please use an image under 5 MB. squoosh.app can shrink big photos.",
    }));
  };

  const refreshCaptcha = () => {
    setCaptchaValue(generateCaptcha());
    setUserCaptchaInput("");
  };

  const resetForm = () => {
    setFile(null);
    setSubject("");
    setCreatedBy("");
    setUserCaptchaInput("");
    setErrors({});
    setIsSuccess(false);
    refreshCaptcha();
  };

  const handleSubmit = async () => {
    const nextErrors = {};
    if (!file) nextErrors.file = "Oops — add your drawing first!";
    if (!subject.trim()) nextErrors.subject = "Give your drawing a name";
    if (!school.trim()) nextErrors.school = "Pick your school so we know where your book goes";
    if (!grade) nextErrors.grade = "Pick your grade so your art lines up with your classmates'";
    if (!validateCaptcha(userCaptchaInput, captchaValue)) {
      nextErrors.captcha = "Those letters don't match — try once more";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("subject", subject.trim());
      formData.append("school", school.trim());
      formData.append("grade", grade);
      formData.append("created_by", createdBy.trim());

      await uploadDrawing(formData);

      trackDrawingUploadSuccess({ school: school.trim(), grade });
      setSubmittedSchool(school.trim());
      setIsSuccess(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrors({
        submit:
          "Something went wrong sending your drawing. Please check your internet and try again — your drawing is still here.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessPanel school={submittedSchool} onReset={resetForm} />;
  }

  return (
    <div className={styles.card} ref={formTopRef}>
      <div className={styles.field}>
        <Text component="label" fw={600} size="lg">
          Your drawing
        </Text>
        {previewUrl ? (
          <div className={styles.preview}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Preview of your drawing" className={styles.previewImage} />
            <div className={styles.previewMeta}>
              <Text size="sm" c="dimmed" truncate>
                {file.name}
              </Text>
              <CloseButton
                aria-label="Remove this drawing"
                onClick={() => setFile(null)}
              />
            </div>
          </div>
        ) : (
          <Dropzone
            onDrop={handleDrop}
            onReject={handleReject}
            maxSize={MAX_FILE_SIZE}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            className={styles.dropzone}
            aria-label="Add your drawing"
          >
            <Group justify="center" gap="xl" mih={180} style={{ pointerEvents: "none" }}>
              <Dropzone.Accept>
                <IconUpload
                  style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-brand-6)" }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }}
                  stroke={1.5}
                />
              </Dropzone.Idle>
              <div>
                <Text size="lg">Tap here to add a photo of your drawing</Text>
                <Text size="sm" c="dimmed" mt={4}>
                  Or drag it in. Photos up to 5 MB work best.
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
        {errors.file && (
          <Text c="red" size="sm">
            {errors.file}
          </Text>
        )}
      </div>

      <TextInput
        label="Title"
        description="What do you call your work of art?"
        placeholder="e.g. My dog on the moon"
        size="lg"
        radius="md"
        value={subject}
        onChange={(e) => {
          setSubject(e.currentTarget.value);
          clearError("subject");
        }}
        error={errors.subject}
      />

      <SchoolSelect
        onChange={(value) => {
          setSchool(value);
          clearError("school");
        }}
        error={errors.school}
      />

      <Select
        label="Grade"
        description="Drawings are grouped by grade in the book"
        placeholder="Pick your grade"
        size="lg"
        radius="md"
        data={GRADES}
        value={grade}
        onChange={(value) => {
          setGrade(value);
          clearError("grade");
        }}
        error={errors.grade}
        checkIconPosition="right"
      />

      <TextInput
        label="Artist's first name (optional)"
        description="First name only, please — it appears under your art in the book"
        placeholder="e.g. Maya"
        size="lg"
        radius="md"
        value={createdBy}
        onChange={(e) => setCreatedBy(e.currentTarget.value)}
      />

      <Captcha
        value={userCaptchaInput}
        onChange={(e) => {
          setUserCaptchaInput(e.currentTarget.value);
          clearError("captcha");
        }}
        captchaValue={captchaValue}
        onRefresh={refreshCaptcha}
        error={errors.captcha}
      />

      {errors.submit && (
        <Text c="red" size="sm">
          {errors.submit}
        </Text>
      )}

      <Button
        size="xl"
        fullWidth
        onClick={handleSubmit}
        loading={isSubmitting}
        loaderProps={{ type: "dots" }}
      >
        {isSubmitting ? "Sending your masterpiece…" : "Add my drawing to the book"}
      </Button>
    </div>
  );
}
