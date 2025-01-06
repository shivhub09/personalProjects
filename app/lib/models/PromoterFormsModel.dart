class PromoterForm {
  final String formId;
  final String collectionName;

  PromoterForm({
    required this.formId,
    required this.collectionName,
  });

  factory PromoterForm.fromJson(Map<String, dynamic> json) {
    return PromoterForm(
      formId: json['formId'] ?? '',
      collectionName: json['collectionName'] ?? 'Unknown',
    );
  }
}
